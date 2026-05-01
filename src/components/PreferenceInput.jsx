import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function PreferenceInput({ criteria, setMatrix }) {
  const n = criteria.length;
  const [prefs, setPrefs] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);

  // 🔥 Échelle complète AHP avec inverses
  const scaleOptions = [
    { label: "1/9", value: 1 / 9 },
    { label: "1/8", value: 1 / 8 },
    { label: "1/7", value: 1 / 7 },
    { label: "1/6", value: 1 / 6 },
    { label: "1/5", value: 1 / 5 },
    { label: "1/4", value: 1 / 4 },
    { label: "1/3 ", value: 1 / 3 },
    { label: "1/2", value: 1 / 2 },

    { label: "1", value: 1 },

    { label: "2", value: 2 },
    { label: "3 ", value: 3 },
    { label: "4", value: 4 },
    { label: "5 ", value: 5 },
    { label: "6", value: 6 },
    { label: "7 ", value: 7 },
    { label: "8", value: 8 },
    { label: "9 ", value: 9 }
  ];

  const handleChange = (i, j, value) => {
    setPrefs(prev => ({
      ...prev,
      [`${i}-${j}`]: parseFloat(value)
    }));
    setIsGenerated(false);
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
    setIsGenerated(true);
  };

  return (
    <div className="space-y-6">

      {/* INFO */}
      <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm border flex gap-3">
        <AlertCircle size={20} />
        <p>
          Sélectionnez le niveau d'importance entre chaque paire de critères.
          <br />
          Exemple : <strong>1/5</strong> signifie que le critère de gauche est moins important que celui de droite.
        </p>
      </div>

      {/* COMPARAISONS */}
      <div className="space-y-4">
        {criteria.map((c1, i) =>
          criteria.map((c2, j) =>
            i < j ? (
              <div
                key={`${i}-${j}`}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">{c1}</span>

                  <span className="text-blue-600 font-bold">
                    {prefs[`${i}-${j}`]
                      ? prefs[`${i}-${j}`].toFixed(3)
                      : "1"}
                  </span>

                  <span className="font-semibold">{c2}</span>
                </div>

                <select
                  className="w-full p-2 border rounded-lg"
                  defaultValue="1"
                  onChange={(e) =>
                    handleChange(i, j, e.target.value)
                  }
                >
                  {scaleOptions.map((opt, index) => (
                    <option key={index} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null
          )
        )}
      </div>

      {/* BOUTON */}
      <button
        onClick={generateMatrix}
        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
      >
        Générer la matrice
      </button>

      {/* SUCCESS */}
      {isGenerated && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 border rounded-xl">
          <CheckCircle2 size={24} />
          <p>Matrice générée avec succès ✅</p>
        </div>
      )}
    </div>
  );
}