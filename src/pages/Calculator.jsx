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

    </div>
  );
}

export default Calculator;
