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
        "palette2": ["#FFF05AFF","#FFD25AFF", "#FFAA5AFF", "#FF785AFF", "#191919FF"],
        "palette3": ["#A2FAA3FF","#92C9B1FF", "#4F759BFF", "#5D5179FF", "#571F4EFF"],
        "palette4": ["#3772FFFF","#F038FFFF", "#EF709DFF", "#E2EF70FF", "#70E4EFFF"],
        "palette5": ["#083D77FF","#EBEBD3FF", "#F4D35EFF", "#EE964BFF", "#F95738FF"],
        "palette6": ["#393E46FF","#01B59FFF", "#FFF4E0FF", "#F8B500FF", "#FC8AA1FF"],
        "palette7": ["#FF2ABBFF","#C200E8FF", "#8916FFFF", "#593EF1FF", "#3358FFFF"],
        "palette8": ["#165B88FF","#03A596FF", "#F0AA21FF", "#FF8000FF", "#F0412CFF"],
        "palette9": ["#DB3567FF","#F27CA2FF", "#F299B6FF", "#F5B8CBFF", "#F5D0DAFF"],
        "palette10": ["#B4D04FFF","#9BC0DCFF", "#467E9BFF", "#5D97B6FF", "#EBF0F3FF"],
        "palette11": ["#9895B4FF","#B39AB7FF", "#D297B3FF", "#FC99ADFF", "#A5AAD4FF"],
        "palette12": ["#000026FF","#03A596FF", "#F0AA21FF", "#F38626FF", "#F0412CFF"],
        "palette13": ["#FFC15EFF","#F7B05BFF", "#F7934CFF", "#CC5803FF", "#1F1300FF"],
        "palette14": ["#3F6335FF","#B7D46DFF", "#FFEABFFF", "#C9B679FF", "#05142BFF"],
        "palett15": ["#700E01FF","#F22602FF", "#FFFFFFFF", "#B0B0B0FF", "#0A0A0AFF"],
        "palette16": ["#F23C50FF","#FFCB05FF", "#E9F1DFFF", "#4AD9D9FF", "#36B1BFFF"],
        "palette17": ["#FA7784FF","#FC948FFF", "#24AEB4FF", "#007A9BFF", "#002358FF"],
        "palette18": ["#642379FF","#FB5D78FF", "#E81F7AFF", "#42F3F5FF", "#2DF3CCFF"],
        "palette19": ["#730117FF","#191E24FF", "#008C5DFF", "#00593BFF", "#022417FF"],
        "palette20": ["#0E5700FF","#FFB21DFF", "#1BA300FF", "#34E000FF", "#FFF200FF"]
    });
    //"palette2": ["#FF","#FF", "#FF", "#FF", "#FF"],

class VisualProperties
{
    constructor(colorIndex = -1)
    {
        //this.shape = shape;
        if (colorIndex < 0)
        {
            color = COLORPALETTE[COLORPALETTE.length * Math.random() << 0]
        }
        else
        {
            color = COLORPALETTE[(colorIndex % (COLORPALETTE.length - 1))]
        }
        this.color = color;
        this.width = 10;
    }
}