export default function () {
  const TAU = Math.PI * 2

  function mod(a, n) {
    return ((a % n) + n) % n
  }
  function normalizeRadians(angle) {
    return mod(angle, TAU)
  }
  function normalizeDegrees(angle) {
    return mod(angle, 360)
  }
  function degreesToRadians(deg, normalize = true) {
    const radians = (deg * TAU) / 360
    if (normalize) {
      return normalizeRadians(radians)
    }
    return radians
  }

  function radiansToDegrees(rag, normalize = true) {
    const degrees = (rag * 360) / TAU
    if (normalize) {
      return normalizeDegrees(degrees)
    }
    return degrees
  }
  function radians(x, y, radio) {
    const dx = x - radio
    const dy = y - radio
    return normalizeRadians(Math.atan2(dy, dx))
  }
  function degrees(x, y, radio) {
    const dx = x - radio
    const dy = y - radio
    return normalizeDegrees(radiansToDegrees(Math.atan2(dy, dx)))
  }
  return {
    TAU,
    normalizeRadians,
    normalizeDegrees,
    radiansToDegrees,
    degreesToRadians,
    radians,
    degrees,
  }
}
