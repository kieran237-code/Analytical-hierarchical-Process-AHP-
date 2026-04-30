import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";

export default function Alternatives({ criteria, setAlternatives }) {
  const [name, setName] = useState("");
  const [values, setValues] = useState(Array(criteria.length).fill("")); // Initialise vide
  const [list, setList] = useState([]);

  const add = () => {
    if (!name || values.some(v => v === "")) {
      alert("Veuillez remplir le nom et tous les scores.");
      return;
    }

    const newAlt = { name, values: values.map(Number) };
    const updated = [...list, newAlt];

    setList(updated);
    setAlternatives(updated);

    // ✅ Reset automatique des champs
    setName("");
    setValues(Array(criteria.length).fill("")); 
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <UserPlus className="text-blue-600" /> Définir les alternatives
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <input
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nom de l'alternative (ex: Asus)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {criteria.map((c, i) => (
          <input
            key={i}
            type="number"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={`Score pour ${c}`}
            value={values[i]}
            onChange={(e) => {
              const newVals = [...values];
              newVals[i] = e.target.value;
              setValues(newVals);
            }}
          />
        ))}
      </div>

      <button onClick={add} className="w-full btn-primary justify-center">
        <Plus size={18} /> Ajouter l'alternative
      </button>

      {/* Liste des alternatives ajoutées */}
      <div className="space-y-2">
        {list.map((alt, i) => (
          <div key={i} className="flex justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm text-sm">
            <span className="font-bold text-slate-700">{alt.name}</span>
            <span className="text-slate-500">{alt.values.join(" | ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}