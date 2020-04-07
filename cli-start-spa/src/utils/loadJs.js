
import { sourceJs } from "@/config/base.config"; // 页面需要动态加载js文件

const win = window
const doc = document

//工具类方法集合
const tools = {
  //返回传递给他的任意对象的类(返回：array、object、number、string)
  typeOf(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";

    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  },

  /*	创建dom元素(不可创建img元素，未做onload事件处理)
   * 	@param option.dom 			创建的dom名
   * 	@param option.attrs 		dom属性设置 JSON格式的键值对
   *  @param option.fatherDom 	所创建dom放在哪个父级元素里（不指定父元素，则默认加在head里）
   *  @param option.callback		dom创建完成后执行的回调
   */
  creatDom (option) {
    let attrs = option.attrs;
    var script = document.createElement('script');
    let callBack = option.callBack

    script.type = 'text/javascript';
    script.src = attrs.url
    //重点！！！！script加载成功
    script.onload = function () {
      callBack && callBack();

    };
    var head = document.getElementsByTagName('head')[0];
    (head || document.body).appendChild(script);

  },

  loadJs(urls, callback) {

    const maxI = urls.length // 加载js的数量
    let jsDone = false // 所有js加载状态
    let curI = 0 // 加载js的当前索引

    //每个js加载完成后的回调
    const loadCallback = (res) => {
      const curUrl = urls[curI]
      tools.typeOf(curUrl) === 'object' && curUrl.isLoad && this.creatDom({
        dom: 'script',
        attrs: {
          name: curUrl.name || 'js',
          // html: res,
          url: curUrl.src,
          async: curUrl.async,
        },
        callBack: function () {

          jsDone = curI === maxI - 1
          callback && jsDone && callback()

          //开始加载下一个
          curI++
          (curI < maxI) && loadFn(urls[curI])

        }
      })

    }

    const loadFn = (curJsData) => {
      loadCallback(curJsData)
    }

    loadFn(urls[curI])

  },

}

/* 自定义动态加载js方法(支持jsList:字符串、对象、数组)，示例如下
  initAsyn([
    'bscroll',
    {
      name: 'bscroll',
      global: 'BScroll',
      ver: '0.0.1',
      isLoad: true,
      cache: false,
      src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
    },
    [
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      },
      {
        name: 'bscroll',
        global: 'BScroll',
        ver: '0.0.1',
        isLoad: true,
        cache: false,
        src: 'https://mstatic.secooimg.com/js/bscroll.min.js'
      }
    ]
  ], () => {
    console.log('加载完毕')


  })
*/
function initAsyn(jsList = [], callback) {

  // js加载列表
  let concatJsListArr = []

  jsList.map((item) => {
    if (tools.typeOf(item) === 'string') {
      // 禁止页面重复加载第三方js逻辑
      if (!sourceJs[item].global || !window[sourceJs[item].global]) {
        concatJsListArr.push(sourceJs[item])
      }
    } else if (tools.typeOf(item) === 'object') {
      // 禁止页面重复加载第三方js逻辑
      if (!item.global || !window[item.global]) {
        concatJsListArr.push(item)
      }
    } else if (tools.typeOf(item) === 'array') {
      concatJsListArr = [].concat(concatJsListArr, item)

      // 禁止页面重复加载第三方js逻辑
      concatJsListArr.map((item) => {
        return !item.global || !window[item.global]
      })
    }
  })

  // 加载所有对应的js
  if (concatJsListArr.length) {
    tools.loadJs(concatJsListArr, () => {
      // 所有js加载完毕后的回调
      if (callback) {
        console.log('自定义动态js加载完毕(本次动态加载' + jsList.length + '个js):', jsList)
        callback()
      }
    })
  } else {
    callback && callback()
  }

}

export {
  initAsyn,
}