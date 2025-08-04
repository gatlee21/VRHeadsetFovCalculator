import React, { useState } from 'react';
import InputField from '../components/InputField.jsx';
import ResultsTable from '../components/ResultsTable.jsx';
import FOVVisualizer from '../components/FOVVisualizer.jsx';
import { calculateFOV } from '../utils/fov.js';
import { calculatePPD } from '../utils/ppd.js';

function Calculator() {

  const [inputs, setInputs] = useState({
    focalLength: 66,
    lensToDisplay: 65,
    displayWidth: 64,
    displayHeight: 121,
    pixelWidth: 1440,
    pixelHeight: 2560,
    eyeRelief: 18,
    ipd: 64,
    cantAngle: 0,
    displayOrientation: 'landscape',
  });

  const [result, setResult] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
  
    const numericFields = [
      'focalLength',
      'lensToDisplay',
      'displayWidth',
      'displayHeight',
      'eyeRelief',
      'ipd',
      'cantAngle',
    ];
    setInputs({
      ...inputs,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  }

  function handleCalculations(e) {
    const fovResults = calculateFOV(inputs);
    const ppd = calculatePPD(inputs);
    setResult({ ...fovResults, ppd }); // Combine results!
  }

  function handleAddToTable(e) {
    if (!result) return;
    setTableRows([
      ...tableRows,
      { inputs: { ...inputs }, results: { ...result } }
    ]);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>

      <div>
        <InputField
          label="Focal length"
          value={inputs.focalLength}
          onChange={handleChange}
          name="focalLength"
          unit="mm"
        />
        <InputField
          label="Lens-to-display distance"
          value={inputs.lensToDisplay}
          onChange={handleChange}
          name="lensToDisplay"
          unit="mm"
        />
        <InputField
          label="Display width"
          value={inputs.displayWidth}
          onChange={handleChange}
          name="displayWidth"
          unit="mm"
        />
        <InputField
          label="Display height"
          value={inputs.displayHeight}
          onChange={handleChange}
          name="displayHeight"
          unit="mm"
        />
        <InputField
          label="Pixel width"
          value={inputs.pixelWidth}
          onChange={handleChange}
          name="pixelWidth"
          unit="px"
        />
        <InputField
          label="Pixel height"
          value={inputs.pixelHeight}
          onChange={handleChange}
          name="pixelHeight"
          unit="px"
        />
        <InputField
          label="Eye-relief"
          value={inputs.eyeRelief}
          onChange={handleChange}
          name="eyeRelief"
          unit="mm"
        />
        <InputField
          label="Interpupillary distance (IPD)"
          value={inputs.ipd}
          onChange={handleChange}
          name="ipd"
          unit="mm"
          />
        <InputField
            label="Cant angle"
            value={inputs.cantAngle}
            onChange={handleChange}
            name="cantAngle"
            unit="degrees"
          />

        <label style={{ display: 'block', marginBottom: 8 }}>
          Display Orientation:&nbsp;
          <select
            name="displayOrientation"
            value={inputs.displayOrientation}
            onChange={handleChange}
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </label>

      <button onClick={handleCalculations}>Calculate FOV</button>
        <button onClick={handleAddToTable} disabled={!result} style={{ marginLeft: 8 }}>
        Add to Table
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <div><strong>Magnification:</strong> {result.magnification.toFixed(2)}x</div>
          <div><strong>Virtual Image Distance:</strong> {result.virtualImageDistance.toFixed(2)} mm</div>
          <div><strong>Virtual Image Width:</strong> {result.virtualWidth.toFixed(2)} mm</div>
          <div><strong>Virtual Image Height:</strong> {result.virtualHeight.toFixed(2)} mm</div>
          <div><strong>Nasal FOV:</strong> {result.fov_nasal.toFixed(2)}°</div>
          <div><strong>Peripheral FOV:</strong> {result.fov_peripheral.toFixed(2)}°</div>
          <div><strong>Total Horizontal FOV:</strong> {result.fov_h_total.toFixed(2)}°</div>
          <div><strong>Stereo Overlap FOV:</strong> {result.stereo_overlap_fov.toFixed(2)}°</div>
          <div><strong>Vertical FOV:</strong> {result.fov_v.toFixed(2)}°</div>
          <div><strong>PPD:</strong> {result.ppd.toFixed(0)}</div>
          {result?.nasalEdgeCase && (
            <div style={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}>
              Edge case: Peripheral FOV &lt; Nasal FOV, swapped values.
            </div>
          )}
        </div>
      )}
      <ResultsTable rows={tableRows} />

    </div>
      <div style={{ marginLeft: 40 }}>
        <FOVVisualizer
          fov_h_total={result?.fov_h_total || 0}
          fov_peripheral={result?.fov_peripheral || 0}
          stereo_overlap_fov={result?.stereo_overlap_fov || 0}
        />
      </div>
    </div>

  );
}

export default Calculator;
