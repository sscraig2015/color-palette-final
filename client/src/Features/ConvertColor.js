

export function convertPalettetoHex(givenPalette){
    return givenPalette.map((colorRGB) => {
      return ConvertRGBtoHex(colorRGB[0], colorRGB[1], colorRGB[2])
    })
}

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
  }
  
  function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }
