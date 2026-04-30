import { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Calculator, 
  ListChecks, 
  Target, 
  BarChart3 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Importation de tes composants
import Objective from "./components/Objective";
import Criteria from "./components/Criteria";
import Alternatives from "./components/Alternatives";
import PreferenceInput from "./components/PreferenceInput";
import Results from "./components/Results";

// Importation des utilitaires de calcul AHP
import { 
  normalizeMatrix, 
  calculateWeights, 
  calculateConsistency, 
  calculateScores 
} from "./utils/ahp";

export default function App() {
  // --- ÉTATS DE L'APPLICATION ---
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [matrix, setMatrix] = useState(null);
  const [results, setResults] = useState(null);

  // --- FONCTIONS DE LOGIQUE ---

  /**
   * Calcule les résultats finaux selon la méthode AHP
   */
  const handleCalculate = () => {
    if (!matrix) {
      alert("Veuillez d'abord générer la matrice de comparaison.");
      return;
    }

    try {
      // 1. Normalisation et calcul des poids des critères
      const normalized = normalizeMatrix(matrix);
      const weights = calculateWeights(normalized);

      // 2. Vérification de la cohérence (CR)[cite: 1]
      const consistency = calculateConsistency(matrix, weights);

      // 3. Calcul des scores finaux pour chaque alternative
      const scores = calculateScores(alternatives, weights);

      setResults({ scores, consistency });
      setStep(4); // Passage à l'écran de résultats
    } catch (error) {
      console.error("Erreur de calcul:", error);
      alert("Une erreur est survenue lors du calcul. Vérifiez vos données.");
    }
  };

  /**
   * Réinitialise complètement l'application pour une nouvelle prévision
   */
  const resetAll = () => {
    setStep(1);
    setObjective("");
    setCriteria([]);
    setAlternatives([]);
    setMatrix(null);
    setResults(null);
  };

  // Configuration du Stepper (Barre de progression)
  const stepsConfig = [
    { id: 1, name: "Objectif", icon: Target },
    { id: 2, name: "Alternatives", icon: ListChecks },
    { id: 3, name: "Comparaisons", icon: Calculator },
    { id: 4, name: "Analyse", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* HEADER & STEPPER */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
           Analytical hierarchical Process (AHP)
          </h1>
          
          <nav className="flex space-x-6">
            {stepsConfig.map((s) => (
              <div 
                key={s.id} 
                className={`flex items-center space-x-2 transition-colors ${
                  step >= s.id ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                <s.icon size={18} />
                <span className="text-xs font-bold uppercase hidden md:inline">{s.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENU PRINCIPAL AVEC ANIMATIONS */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
          >
            
            {/* ÉTAPE 1 : OBJECTIF ET CRITÈRES */}
            {step === 1 && (
              <div className="space-y-8">
                <Objective setObjective={setObjective} value={objective} />
                <hr className="border-slate-100" />
                <Criteria setCriteria={setCriteria} initialCriteria={criteria} />
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setStep(2)} 
                    disabled={criteria.length < 2}
                    className={`btn-primary ${criteria.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Suivant <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : ALTERNATIVES */}
            {step === 2 && (
              <div className="space-y-8">
                <Alternatives criteria={criteria} setAlternatives={setAlternatives} />
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="btn-secondary">
                    <ChevronLeft size={18} /> Retour
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={alternatives.length < 2}
                    className={`btn-primary ${alternatives.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Passer aux comparaisons <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : MATRICE DE PRÉFÉRENCES */}
            {step === 3 && (
              <div className="space-y-8">
                <PreferenceInput criteria={criteria} setMatrix={setMatrix} />
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(2)} className="btn-secondary">
                    <ChevronLeft size={18} /> Retour
                  </button>
                  <button onClick={handleCalculate} className="btn-success">
                    Lancer l'analyse <BarChart3 size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : RÉSULTATS FINAUX */}
            {step === 4 && (
              <Results 
                results={results} 
                onReset={resetAll} 
                objective={objective} 
              />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER DISCRET */}
      <footer className="text-center py-8 text-slate-400 text-sm">
       <p className="text-slate-400 text-sm max-w-md mx-auto">
  <strong>Analytical hierarchical Process (AHP)</strong> — Simplifiez vos décisions complexes en utilisant 
  la méthode de hiérarchie multicritère pour obtenir des résultats objectifs et cohérents.
</p>
      </footer>
    </div>
  );
}