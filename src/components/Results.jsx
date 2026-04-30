import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

// 🔥 ENREGISTREMENT OBLIGATOIRE
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Results({ results }) {
  if (!results) return null;

  // 🔹 Trier les scores (du meilleur au pire)
  const sorted = [...results.scores].sort((a, b) => b.score - a.score);

  const best = sorted[0];

  // 🔹 Données pour graphique
  const data = {
    labels: sorted.map(r => r.name),
    datasets: [
      {
        label: "Score AHP",
        data: sorted.map(r => r.score),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Comparaison des alternatives (AHP)"
      }
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Résultats</h2>

      {/*  MEILLEUR CHOIX */}
      <div style={{ marginBottom: "15px" }}>
        <h3>Meilleur choix : {best.name}</h3>
        <p><strong>Score :</strong> {best.score.toFixed(2)}</p>
      </div>

      {/* COHERENCE */}
      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>Consistency Ratio (CR) :</strong>{" "}
          {results.consistency.CR.toFixed(4)}
        </p>

        {results.consistency.CR < 0.1 ? (
          <p style={{ color: "green" }}>
             Matrice cohérente (CR &lt; 0.1)
          </p>
        ) : (
          <p style={{ color: "red" }}>
             Matrice incohérente (CR &gt; 0.1)
          </p>
        )}
      </div>

      {/* TABLEAU DETAILLE */}
      <table border="1" cellPadding="5" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Alternative</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.score.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ GRAPHIQUE */}
      <Bar key={JSON.stringify(data)} data={data} options={options} />
    </div>
  );
}