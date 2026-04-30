import { useState } from "react";

export default function PairwiseMatrix({ criteria, setMatrix }) {
  const n = criteria.length;

  const [localMatrix, setLocalMatrix] = useState(
    Array(n).fill(0).map((_, i) =>
      Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
    )
  );

  const handleChange = (i, j, value) => {
    const newMatrix = [...localMatrix];
    newMatrix[i][j] = parseFloat(value);
    newMatrix[j][i] = 1 / value;
    setLocalMatrix(newMatrix);
    setMatrix(newMatrix);
  };

  return (
    <table>
      <tbody>
        {criteria.map((c, i) => (
          <tr key={i}>
            {criteria.map((_, j) => (
              <td key={j}>
                {i === j ? (
                  1
                ) : (
                  <input
                    type="number"
                    onChange={(e) =>
                      handleChange(i, j, e.target.value)
                    }
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
