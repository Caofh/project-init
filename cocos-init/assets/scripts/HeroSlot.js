const getRandomInt = function (min, max) {
    var ratio = Math.random();
    return min + Math.floor((max - min) * ratio);
};

cc.Class({
    extends: cc.Component,

    properties: {
        sfAttributes: {
            default: [],
            type: cc.SpriteFrame
        },
        sfRanks: {
            default: [],
            type: cc.SpriteFrame
        },
        sfHeroes: {
            default: [],
            type: cc.SpriteFrame
        },
        sfBorders: {
            default: [],
            type: cc.SpriteFrame
        },
        labelLevel: {
            default: null,
            type: cc.Label
        },
        spHero: {
            default: null,
            type: cc.Sprite
        },
        spRank: {
            default: null,
            type: cc.Sprite
        },
        spAttribute: {
            default: null,
            type: cc.Sprite
        },
        spBorder: {
            default: null,
            type: cc.Sprite
        },
        spStars: {
            default: [],
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
        this.refresh();
    },

    refresh: function () {
        let bgIdx = getRandomInt(0, this.sfBorders.length);
        let heroIdx = getRandomInt(0, this.sfHeroes.length);
        let starIdx = getRandomInt(0, this.spStars.length);
        let rankIdx = getRandomInt(0, this.sfRanks.length);
        let attIdx = getRandomInt(0, this.sfAttributes.length);
        let levelIdx = getRandomInt(0, 100);
        this.labelLevel.string = 'LV.' + levelIdx;
        this.spRank.spriteFrame = this.sfRanks[rankIdx];
        this.refreshStars(starIdx);
        this.spBorder.spriteFrame = this.sfBorders[bgIdx];
        this.spAttribute.spriteFrame = this.sfAttributes[attIdx];
        this.spHero.spriteFrame = this.sfHeroes[heroIdx];
    },

    refreshStars: function (count) {
        for (let i = 0; i < this.spStars.length; ++i) {
            if (i <= count) this.spStars[i].enabled = true;
            else this.spStars[i].enabled = false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
