import React, { useEffect } from 'react';
import { Stage, Layer, Arc } from 'react-konva';

// FOV props should be in degrees: fov_peripheral, stereo_overlap_fov}
function FOVVisualizer({fov_peripheral, stereo_overlap_fov }) {

  var totalFOV = fov_peripheral * 2;
  const stereoFOV = stereo_overlap_fov;
  const leftPeripheralStart = -totalFOV / 2;
  const leftPeripheralEnd = -stereoFOV / 2;
  const rightPeripheralStart = stereoFOV / 2;
  const rightPeripheralEnd = totalFOV / 2;
  const stereoStart = -stereoFOV / 2;
  const stereoEnd = stereoFOV / 2;

  const cx = 250, cy = 250, r = 200;

  return (
    <Stage width={500} height={500}>
      <Layer>
        <Arc
          x={cx}
          y={cy}
          innerRadius={0}
          outerRadius={r}
          angle={220}
          rotation={160}
          fill="gray"
          opacity={0.25}
        />
        {/* Left peripheral (red) */}
        <Arc
          x={cx}
          y={cy}
          innerRadius={0}
          outerRadius={r}
          angle={leftPeripheralEnd - leftPeripheralStart}
          rotation={leftPeripheralStart - 90}
          fill="rgba(255,0,0,0.5)"
        />
        {/* Right peripheral (blue) */}
        <Arc
          x={cx}
          y={cy}
          innerRadius={0}
          outerRadius={r}
          angle={rightPeripheralEnd - rightPeripheralStart}
          rotation={rightPeripheralStart - 90}
          fill="rgba(0,0,255,0.5)"
        />
        {/* Stereo overlap (purple) */}
        <Arc
          x={cx}
          y={cy}
          innerRadius={0}
          outerRadius={r}
          angle={stereoEnd - stereoStart}
          rotation={stereoStart - 90}
          fill="rgba(128,0,128,0.6)"
          opacity={1}
        />
        {/* Draw center point */}
        <Arc
          x={cx}
          y={cy}
          innerRadius={0}
          outerRadius={8}
          angle={360}
          fill="black"
        />
      </Layer>
    </Stage>
  );
}

export default FOVVisualizer;
