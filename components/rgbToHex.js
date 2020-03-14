let rgbToHex = (r,g,b,) =>{
    return "#" + ((1<<24) + (r<<16)+ (g <<8) + b).toString(16).slice(1) 
}

let hexToRgb = hex =>{
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + ',' + g + ',' + b
}
