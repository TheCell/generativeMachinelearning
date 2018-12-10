"use strict";

let randomProperty = function (obj)
{
    let keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

let SHAPES = Object.freeze({
    "circle": 1,
    "square": 2
});

let COLORPALETTE = randomProperty(
    {
        "palette1": ["#E8AEB7FF","#B8E1FFFF", "#A9FFF7FF", "#94FBABFF", "#82ABA1FF"],
        "palette2": ["#FFC15EFF","#F7B05BFF", "#F7934CFF", "#CC5803FF", "#1F1300FF"]
    });

class VisualProperties
{
    constructor(shape, color = COLORPALETTE[COLORPALETTE.length * Math.random() << 0])
    {
        this.shape = shape;
        this.color = color;
    }
}