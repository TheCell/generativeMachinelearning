"use strict";

let SHAPES = Object.freeze({
    "circle": 1,
    "square": 2
})

class VisualProperties
{
    constructor(shape, color)
    {
        this.shape = shape;
        this.color = color;
    }
}