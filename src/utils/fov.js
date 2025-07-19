
// Calculate magnification M = f / (f - dp)
export function calculateMagnification(f, dp) {
  return f / (f - dp);
}

// Calculate virtual image distance d_v = 1 / (1/f - 1/dp)
export function calculateVirtualImageDistance(f, dp) {
  return 1 / ((1 / f) - (1 / dp));
}

// Virtual image width
export function calculateVirtualWidth(M, w) {
  return M * w;
}

// Virtual image height
export function calculateVirtualHeight(M, h) {
  return M * h;
}

// Nasal FOV (full cone): 2 * arctan(...)
export function calculateHorizontalFOV_Nasal(M, ipd, d_eye, d_v) {
  const numerator = M * (ipd / 2);
  return Math.atan(numerator / (d_eye + d_v)) * (180 / Math.PI);
}

// Monocular FOV (full cone): 2 * arctan(...)
export function calculateHorizontalFOV_Monocular(M, w, ipd, d_eye, d_v) {
  const numerator = M * (w - (ipd / 2));
  return Math.atan(numerator / (d_eye + d_v)) * (180 / Math.PI);
}

// Total horizontal FOV = monocular * 2
export function calculateHorizontalFOV_Total(fov_monocular) {
  return fov_monocular * 2;
}

// Stereo overlap FOV = nasal * 2
export function calculateStereoOverlapFOV(fov_nasal) {
  return fov_nasal * 2;
}

// Vertical FOV (full cone): 2 * arctan(...)
export function calculateVerticalFOV(M, h, d_eye, d_v) {
  const numerator = M * (h / 2);
  return 2 * Math.atan(numerator / (d_eye + d_v)) * (180 / Math.PI);
}

// Main FOV calculation wrapper
export function calculateFOV({
  focalLength,       // effective focal length
  lensToDisplay,     // lens-to-display distance
  displayWidth,      // display width
  displayHeight,     // display height
  eyeRelief,         // eye-relief
  ipd                // interpupillary distance
}) {
  const magnification = calculateMagnification(focalLength, lensToDisplay);
  const virtualImageDistance = calculateVirtualImageDistance(focalLength, lensToDisplay);
  const virtualWidth = calculateVirtualWidth(magnification, displayWidth);
  const virtualHeight = calculateVirtualHeight(magnification, displayHeight);

  const fov_nasal = calculateHorizontalFOV_Nasal(magnification, ipd, eyeRelief, virtualImageDistance);
  const fov_monocular = calculateHorizontalFOV_Monocular(magnification, displayWidth, ipd, eyeRelief, virtualImageDistance);
  const fov_h_total = calculateHorizontalFOV_Total(fov_monocular);
  const stereo_overlap_fov = calculateStereoOverlapFOV(fov_nasal);
  const fov_v = calculateVerticalFOV(magnification, displayHeight, eyeRelief, virtualImageDistance);

  return {
    magnification,
    virtualImageDistance,
    virtualWidth,
    virtualHeight,
    fov_nasal,
    fov_monocular,
    fov_h_total,
    stereo_overlap_fov,
    fov_v
  };
}

