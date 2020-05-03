
/* 封装飞书原生api */


/**
 * 飞书文档地址：https://open.feishu.cn/document/uYjL24iN/ugzMy4COzIjL4MjM
 弹框提示信息
 * str: 内容
 * icon: 图标
 * duration: 提示框停留时间(ms)
 实例:
    1.common.showToast('请求成功')
    2.common.showToast('请求成功', 'success')
    3.common.showToast('请求成功', 'loading', '2000')
 **/
function showToast(str = '操作成功', icon = 'success', duration = 1500) {
    return new Promise((resolve, reject) => {
        tt.showToast({
            title: str,
            icon: icon,
            duration: duration,
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}
function showLoading(str = '加载中') {
    return new Promise((resolve, reject) => {
        tt.showLoading({
            title: str,
            mask: true,
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}
function hideLoading() {
    return new Promise((resolve, reject) => {
        tt.hideLoading({
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}

/** 获取用户信息
    common.getUserInfo().then((res) => {
        console.log(res)
    })
 */
function getUserInfo() {
    return new Promise((resolve, reject) => {
        tt.getUserInfo({
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}

/** 获取用户信息
    common.login().then((res) => {
        console.log(res)
    })
 */
function login() {
    return new Promise((resolve, reject) => {
        tt.login({
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}

/** 获取dom元素当前位置及宽高信息
    common.getDomInfo('.container').then((res) => {
        console.log(res)
    })
 */
function getDomInfo(dom) {
    return new Promise((resolve, reject) => {
        tt.createSelectorQuery().select(dom).boundingClientRect((res) => {
            resolve(res)
        }).exec()
    })
}

/** 获取系统信息（宽高等）
    common.getSystemInfo().then((res) => {
        console.log(res)
    })
 */
function getSystemInfo() {
    return new Promise((resolve, reject) => {
        tt.getSystemInfo({
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}

/** 获取系统信息（宽高等）
 common.pageScrollTo().then((res) => {
        console.log(res)
    })
 */
function pageScrollTo(target = 0, duration = 1000) {
    return new Promise((resolve, reject) => {
        tt.pageScrollTo({
            scrollTop: target,
            duration: duration,
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res)
            }
        });
    })
}

// 获取storage中的值
function getStorage(name, subName) {
    let result = ''
    if (!subName) {
        result = tt.getStorageSync(name) || ''
    } else {
        result = tt.getStorageSync(name) && tt.getStorageSync(name)[subName] ? tt.getStorageSync(name)[subName] : ''
    }

    return result
}
// 设置storage中的值
function setStorage(name, data) {
    tt.setStorageSync(name, data);
}
// 清除storage中的值
function removeStorage(name, data) {
    tt.removeStorageSync(name);
}
// 清除全部storage值
function clearStorage() {
    tt.clearStorageSync();
}
// 获取全部storage值
function getStorageAll() {
    tt.getStorageInfoSync();
}

/*
getDomSize('.logistics_step.last').then((rect) => {

  // 逻辑代码
  this.autoHeight_last = rect.height || 0

})
 */
function getDomSize(dom) {
    return new Promise((resolve, reject) => {

        let query = tt.createSelectorQuery();
        // 取dom元素的尺寸
        query.select(dom).boundingClientRect((rect) => {

            resolve(rect)

        }).exec();

    })
}

module.exports = {
    showToast,
    showLoading,
    hideLoading,
    getUserInfo,
    login,
    getDomInfo,
    getSystemInfo,
    pageScrollTo,
    getStorage,
    setStorage,
    removeStorage,
    clearStorage,
    getStorageAll,
    getDomSize,
}














