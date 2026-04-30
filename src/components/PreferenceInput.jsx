import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function PreferenceInput({ criteria, setMatrix }) {
  const n = criteria.length;
  const [prefs, setPrefs] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);

  const handleChange = (i, j, value) => {
    setPrefs(prev => ({ ...prev, [`${i}-${j}`]: parseFloat(value) }));
    setIsGenerated(false); // Cache le message si l'utilisateur modifie une valeur
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
      <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm border border-blue-100 flex gap-3">
        <AlertCircle size={20} className="shrink-0" />
        <p><strong>Échelle de Saaty :</strong> Comparez l'importance relative des critères. 1 signifie égalité, 9 signifie une importance extrême de l'un sur l'autre.</p>
      </div>

      <div className="space-y-4">
        {criteria.map((c1, i) =>
          criteria.map((c2, j) =>
            i < j ? (
              <div key={`${i}-${j}`} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 transition-all hover:border-blue-300">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{c1}</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-lg">{prefs[`${i}-${j}`] || 1}</span>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{c2}</span>
                </div>
                <input 
                  type="range" min="1" max="9" step="1"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  onChange={(e) => handleChange(i, j, e.target.value)}
                />
              </div>
            ) : null
          )
        )}
      </div>

      <button onClick={generateMatrix} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
        Générer la matrice de comparaison
      </button>

      {/* ✅ Message de succès dynamique */}
      {isGenerated && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl animate-bounce-short">
          <CheckCircle2 size={24} />
          <p className="font-medium">Votre matrice est bien générée ! Cliquez maintenant sur <strong>"Lancer l'analyse"</strong> ci-dessous.</p>
        </div>
      )}
    </div>
  );
}