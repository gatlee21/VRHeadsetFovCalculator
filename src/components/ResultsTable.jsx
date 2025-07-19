import React from 'react';

function ResultsTable({ rows }) {
  if (rows.length === 0) return null;

  return (
    <table border="1" style={{ marginTop: 30 }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Config</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {Object.entries(row.inputs).map(([k, v]) => (
                <div key={k}>{k}: {v}</div>
              ))}
            </td>
            <td>
              {Object.entries(row.results).map(([k, v]) => (
                <div key={k}>{k}: {typeof v === "number" ? v.toFixed(2) : v}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
