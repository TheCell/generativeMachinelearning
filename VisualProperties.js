"use strict";

let randomProperty = function (obj)
{
    let keys = Object.keys(obj)
    let key = keys[ keys.length * Math.random() << 0];
    console.log(key)
    return obj[key];
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
        "palette20": ["#0E5700FF","#FFB21DFF", "#1BA300FF", "#34E000FF", "#FFF200FF"],
        "palette21": ["#004466FF","#016699FF", "#5BB7D4FF", "#E4E5E6FF", "#FF2105FF"],
        "palette22": ["#72A6A6FF","#255959FF", "#012626FF", "#E4F2EDFF", "#D98F4EFF"],
        "palette23": ["#B24441FF","#FFFFE3FF", "#FFCBCAFF", "#75A7CCFF", "#2174B2FF"],
        "palette24": ["#4E7300FF","#708C01FF", "#A7C404FF", "#D4BC00FF", "#F5F5F5FF"],
        "palette25": ["#8F4C8CFF","#EBC133FF", "#374B94FF", "#2DD3D6FF", "#427FC4FF"],
        "palette26": ["#2E3834FF","#3D6A53FF", "#4A9888FF", "#A7DE6DFF", "#D4F082FF"],
        "palette27": ["#F2EC9BFF","#D9AF32FF", "#A6751BFF", "#8C5511FF", "#731616FF"]
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
            if (colorIndex > 4)
            {
                let hexColor = color.slice(0, 7);
                let rgbColor = hexToRgb(hexColor);
                rgbColor.r = parseInt(rgbColor.r * 0.5);
                rgbColor.g = parseInt(rgbColor.g * 0.5);
                rgbColor.b = parseInt(rgbColor.b * 0.5);
                hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
                color = hexColor + "FF";
            }
            //console.log(`${colorIndex} + ${color}`);
        }
        this.color = color;
        this.width = 10;
    }
}

function hexToRgb(hex)
{
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c)
{
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}