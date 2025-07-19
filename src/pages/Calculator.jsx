import React, { useState } from 'react';
import InputField from '../components/InputField.jsx';

function Calculator() {

  const [inputs, setInputs] = useState({
    focalLength: 66,
    lensToDisplay: 65,
    displayWidth: 121,
    displayHeight: 64,
    eyeRelief: 18,
    ipd: 70,
  });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
  }

  return (
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
    </div>
  );
}

export default Calculator;
