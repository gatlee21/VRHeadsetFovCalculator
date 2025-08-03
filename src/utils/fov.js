
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
export function calculateHorizontalFOV_Nasal(M, ipd, d_eye, d_v, cant) {
  const numerator = M * (ipd / 2);
  return Math.atan(numerator / (d_eye + d_v)) * (180 / Math.PI) + cant;
}

// Peripheral FOV (full cone): 2 * arctan(...)
export function calculateHorizontalFOV_Peripheral(M, w, ipd, d_eye, d_v, cant) {
  const numerator = M * (w - (ipd / 2));
  return Math.atan(numerator / (d_eye + d_v)) * (180 / Math.PI) - cant;
}

// Total horizontal FOV = peripheral * 2
export function calculateHorizontalFOV_Total(fov_peripheral) {
  return fov_peripheral * 2;
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
  ipd,               // interpupillary distance
  cantAngle,
}) {
  var magnification = calculateMagnification(focalLength, lensToDisplay);
  var virtualImageDistance = calculateVirtualImageDistance(focalLength, lensToDisplay);
  var virtualWidth = calculateVirtualWidth(magnification, displayWidth);
  var virtualHeight = calculateVirtualHeight(magnification, displayHeight);

  var fov_nasal = Math.abs(calculateHorizontalFOV_Nasal(magnification, ipd, eyeRelief, virtualImageDistance, cantAngle));
  var fov_peripheral = Math.abs(calculateHorizontalFOV_Peripheral(magnification, displayWidth, ipd, eyeRelief, virtualImageDistance, cantAngle));
  var fov_h_total = Math.abs(calculateHorizontalFOV_Total(fov_peripheral));
  var stereo_overlap_fov = Math.abs(calculateStereoOverlapFOV(fov_nasal));
  var fov_v = Math.abs(calculateVerticalFOV(magnification, displayHeight, eyeRelief, virtualImageDistance));

  let nasalEdgeCase = false;
  // Handle case where nasal > temporal
  if (fov_nasal > fov_peripheral) {
    // Swap stereo and total horizontal
    var temp_fov_h_total = fov_h_total;
    fov_h_total = stereo_overlap_fov;
    stereo_overlap_fov = temp_fov_h_total;

    // Swap nasal and temporal
    var temp_fov_nasal = fov_nasal;
    fov_nasal = fov_peripheral;
    fov_peripheral = temp_fov_nasal;

    nasalEdgeCase = true;
  }

  return {
    magnification,
    virtualImageDistance,
    virtualWidth,
    virtualHeight,
    fov_nasal,
    fov_peripheral,
    fov_h_total,
    stereo_overlap_fov,
    fov_v,
    nasalEdgeCase,
  };
}

