"use client";
import React from "react";
import "./Home.css";

function MainComponent() {
  const [rows, setRows] = React.useState([
    { id: 1, subject: "", grade: "", credit: "" },
  ]);
  const [cgpa, setCgpa] = React.useState(0);

  const gradeToValue = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6
  };

  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, subject: "", grade: "", credit: "" },
    ]);
  };

  const handleInput = (id, field, value) => {
    if (field === "grade" && value.length > 3) {
      value = value.substring(0, 3);
    }
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const calculateCGPA = () => {
    let totalGrades = 0;
    let totalCredits = 0;
    rows.forEach((row) => {
      const gradeVal = gradeToValue[row.grade] || 0; // Map grade to value
      const creditVal = parseInt(row.credit, 10) || 0;
      totalGrades += gradeVal * creditVal;
      totalCredits += creditVal;
    });
    setCgpa(totalCredits ? (totalGrades / totalCredits).toFixed(2) : 0);
  };

  return (
    <div className="main-container">
      <h1 className="title">CGPA Calculator</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">S.No</th>
              <th className="table-cell">Subject</th>
              <th className="table-cell">Grade</th>
              <th className="table-cell">Credit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">
                  <input
                    name="subject"
                    type="text"
                    value={row.subject}
                    onChange={(e) =>
                      handleInput(row.id, "subject", e.target.value)
                    }
                    className="input-field"
                  />
                </td>
                <td className="table-cell">
                  <input
                    name="grade"
                    type="text"
                    value={row.grade}
                    maxLength={3}
                    onChange={(e) =>
                      handleInput(row.id, "grade", e.target.value.toUpperCase())
                    }
                    className="input-field"
                  />
                </td>
                <td className="table-cell">
                  <input
                    name="credit"
                    type="number"
                    value={row.credit}
                    onChange={(e) =>
                      handleInput(row.id, "credit", e.target.value)
                    }
                    className="input-field"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={addRow} className="add-button">
          One More Row
        </button>
        <button onClick={calculateCGPA} className="calculate-button">
          Calculate
        </button>
      </div>
      <div className="cgpa-container">
        <span className="cgpa-label">CGPA:</span>
        <span className="cgpa-value">{cgpa}</span>
      </div>
    </div>
  );
}

export default MainComponent;
