let rgbToHex = (r,g,b,) =>{
    return "#" + ((1<<24) + (r<<16)+ (g <<8) + b).toString(16).slice(1) 
}
console.log(rgbToHex(0,51,255))
