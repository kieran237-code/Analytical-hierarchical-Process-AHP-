import { useState } from "react";

export default function Criteria({ setCriteria }) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const add = () => {
    if (!input) return;
    const updated = [...list, input];
    setList(updated);
    setCriteria(updated);
    setInput("");
  };

  return (
    <div>
      <h3>Critères</h3>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={add}>Ajouter</button>

      <ul>
        {list.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
