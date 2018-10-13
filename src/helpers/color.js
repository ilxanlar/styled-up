import tinyColor from 'tinycolor2';

export function lighten(color, value) {
  return tinyColor(color)
    .lighten(value)
    .toHexString();
}

export function darken(color, value) {
  return tinyColor(color)
    .darken(value)
    .toHexString();
}
