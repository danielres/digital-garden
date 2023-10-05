// Adapted from ImageFilters.js: https://github.com/zhengsk/ImageFilters.js

export const clamp = (value: number) => Math.max(0, Math.min(255, value))

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = (max + min) / 2
  let s = (max + min) / 2
  const l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const delta = max - min
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    h =
      max === r
        ? (g - b) / delta + (g < b ? 6 : 0)
        : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4
    h /= 6
  }
  return [h, s, l]
}

export const hslToRgb = (h: number, s: number, l: number) => {
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export const HSLAdjustment = (
  srcImageData: ImageData,
  hueDelta: number,
  satDelta: number,
  lightness: number
) => {
  const srcPixels = srcImageData.data
  const dstImageData = new ImageData(srcImageData.width, srcImageData.height)
  const dstPixels = dstImageData.data

  for (let i = 0; i < srcPixels.length; i += 4) {
    const [h, s, l] = rgbToHsl(srcPixels[i], srcPixels[i + 1], srcPixels[i + 2])
    const newH = (h + hueDelta / 360) % 1
    const newS = Math.min(Math.max(s + satDelta / 100, 0), 1)
    const newL = l + lightness / 100
    const [r, g, b] = hslToRgb(newH, newS, newL)
    dstPixels[i] = clamp(r)
    dstPixels[i + 1] = clamp(g)
    dstPixels[i + 2] = clamp(b)
    dstPixels[i + 3] = srcPixels[i + 3]
  }
  return dstImageData
}
