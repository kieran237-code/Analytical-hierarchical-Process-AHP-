import { useState } from "react";
import Objective from "./components/Objective";
import Criteria from "./components/Criteria";
import Alternatives from "./components/Alternatives";
import PreferenceInput from "./components/PreferenceInput";
import Results from "./components/Results";

import {
  normalizeMatrix,
  calculateWeights,
  calculateConsistency,
  calculateScores
} from "./utils/ahp";

function App() {
  const [objective, setObjective] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    if (!matrix) return alert("Génère d'abord la matrice");

    const normalized = normalizeMatrix(matrix);
    const weights = calculateWeights(normalized);
    const consistency = calculateConsistency(matrix, weights);

    if (!consistency.isConsistent) {
      alert("❌ Matrice incohérente (CR > 0.1)");
      return;
    }

    const scores = calculateScores(alternatives, weights);
    setResults({ scores, consistency });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AHP Decision App</h1>

      <Objective setObjective={setObjective} />
      <Criteria setCriteria={setCriteria} />
      <Alternatives criteria={criteria} setAlternatives={setAlternatives} />

      {criteria.length > 1 && (
        <PreferenceInput criteria={criteria} setMatrix={setMatrix} />
      )}

      <button onClick={handleCalculate}>Calculer</button>

      {results && <Results results={results} />}
    </div>
  );
}

export default App;