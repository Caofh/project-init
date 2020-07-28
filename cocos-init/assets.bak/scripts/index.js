
import { setGlobal, getGlobal } from './utils/common'

// 组件
const MenuSidebar = require('./tabs/MenuSidebar');

cc.Class({
    extends: cc.Component,

    properties: {
        curCanvas: cc.Node,
        sidebar: MenuSidebar,
        roller: cc.Node,
        panelWidth: 0,
        tabSwitchDuration: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let wHeight = window.innerHeight
        this.curCanvas.height = wHeight

        // 设置全局变量
        setGlobal('wHeight', wHeight)

        console.log(this.sidebar)

        this.sidebar.init(this);

    },

    btnClick () {
        console.log(456)
    },

    start () {

    },

    // update (dt) {},
});
