import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Criteria({ setCriteria }) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const add = () => {
    if (!input.trim()) return;
    const updated = [...list, input];
    setList(updated);
    setCriteria(updated);
    setInput("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
        Quels sont vos critères de décision ?
      </h3>
      <div className="flex gap-2">
        <input 
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Ex: Prix, Qualité, Délais..."
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={add} className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2">
          <Plus size={18} /> Ajouter
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {list.map((c, i) => (
          <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200 flex items-center gap-2">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}