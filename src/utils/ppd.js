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

export function calculatePPD({
  focalLength,
  lensToDisplay,
  displayWidth,
  displayHeight,
  pixelWidth,
  pixelHeight,
  displayOrientation
}) {
    // Select the appropriate dimension and pixel count based on orientation
    if (displayOrientation == "landscape") {
        pixelWidth = pixelHeight;
        displayWidth = displayHeight;
    }

    const magnification = calculateMagnification(focalLength, lensToDisplay);
    const virtualImageDistance = calculateVirtualImageDistance(focalLength, lensToDisplay);
    const virtualImageWidth = calculateVirtualWidth(magnification, displayWidth);

    const horizontalFovRadians = 2 * Math.atan((virtualImageWidth / 2) / virtualImageDistance);
    const horizontalFovDegrees = horizontalFovRadians * (180 / Math.PI);

    return Math.abs(pixelWidth / horizontalFovDegrees);
}

