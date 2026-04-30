import { useState } from "react";

export default function PreferenceInput({ criteria, setMatrix }) {
  const n = criteria.length;
  const [prefs, setPrefs] = useState({});
  const scale = [1,2, 3, 4, 5, 6, 7, 8, 9];

  const handleChange = (i, j, value) => {
    setPrefs(prev => ({ ...prev, [`${i}-${j}`]: parseFloat(value) }));
  };

  const generateMatrix = () => {
    const matrix = Array(n).fill(0).map(() => Array(n).fill(1));

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const val = prefs[`${i}-${j}`] || 1;
        matrix[i][j] = val;
        matrix[j][i] = 1 / val;
      }
    }

    setMatrix(matrix);
    alert(" Matrice générée !");
  };

  return (
    <div>
      <h3>Comparaison des critères</h3>

      <p>
        1 = égal | 3 = modéré | 5 = fort | 7 = très fort | 9 = extrême
      </p>

      {criteria.map((c1, i) =>
        criteria.map((c2, j) =>
          i < j ? (
            <div key={`${i}-${j}`}>
              {c1} vs {c2}
              <select onChange={(e) => handleChange(i, j, e.target.value)}>
                {scale.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ) : null
        )
      )}

      <button onClick={generateMatrix}>
        Générer la matrice
      </button>
    </div>
  );
}