import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { RefreshCcw, Trophy, AlertTriangle, CheckCircle } from "lucide-react";

// ✅ CETTE ÉTAPE EST OBLIGATOIRE
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { RefreshCcw, Trophy, AlertTriangle, CheckCircle } from "lucide-react";
import { Bar } from "react-chartjs-2";

export default function Results({ results, onReset }) {
  if (!results) return null;

  const sorted = [...results.scores].sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const isConsistent = results.consistency.CR < 0.1;

  const data = {
    labels: sorted.map(r => r.name),
    datasets: [{
      label: "Score global AHP",
      data: sorted.map(r => r.score),
      backgroundColor: isConsistent ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)',
      borderRadius: 8,
    }]
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Analyse Terminée</h2>
        <p className="text-slate-500">Voici les résultats basés sur vos préférences multicritères.</p>
      </div>

      {/* Carte du Gagnant */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Meilleure Alternative</p>
          <h3 className="text-4xl font-black mt-1">{best.name}</h3>
          <p className="mt-4 text-blue-100 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-400" />
            Score final : {best.score.toFixed(2)}[cite: 1]
          </p>
        </div>
        <Trophy size={80} className="opacity-20 hidden sm:block" />
      </div>

      {/* Statut de Cohérence */}
      <div className={`flex items-center gap-4 p-5 rounded-2xl border ${isConsistent ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
        {isConsistent ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
        <div>
          <p className="font-bold">Indice de cohérence (CR) : {results.consistency.CR.toFixed(4)}</p>
          <p className="text-sm">{isConsistent 
            ? "Votre logique de comparaison est valide." 
            : "Vos comparaisons présentent des contradictions. Les résultats peuvent être biaisés."}</p>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80">
        <Bar data={data} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
      </div>

      {/* Actions Finales */}
      <div className="pt-6 border-t border-slate-100">
        <button 
          onClick={onReset}
          className="w-full flex items-center justify-center gap-3 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all group"
        >
          <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          Refaire une autre prévision
        </button>
      </div>
    </div>
  );
}