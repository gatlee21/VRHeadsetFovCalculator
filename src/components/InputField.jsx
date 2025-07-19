import React from 'react';

function InputField({ label, value, onChange, name, unit }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label>
        {label}:
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          style={{ marginLeft: 8, marginRight: 4 }}
        />
        {unit}
      </label>
    </div>
  );
}

export default InputField;
