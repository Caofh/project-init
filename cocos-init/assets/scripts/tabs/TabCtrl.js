cc.Class({
    extends: cc.Component,

    properties: {
        idx: 0,
        icon: cc.Sprite,
        arrow: cc.Node,
        anim: cc.Animation
    },

    // use this for initialization
    init (tabInfo) { // sidebar, idx, iconSF
        this.sidebar = tabInfo.sidebar;
        this.idx = tabInfo.idx;
        this.icon.spriteFrame = tabInfo.iconSF;

        this.node.on('touchstart', this.onPressed.bind(this), this.node);
        this.arrow.scale = cc.v2(0, 0);
    },

    onPressed () {
        console.log(123)

        this.sidebar.tabPressed(this.idx);
    },

    turnBig () {
        this.anim.play('tab_turn_big');
    },

    turnSmall () {
        this.anim.play('tab_turn_small');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
