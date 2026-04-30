import { useState } from "react";

export default function Criteria({ setCriteria }) {
  const [input, setInput] = useState("");

  const add = () => {
    setCriteria(prev => [...prev, input]);
    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={add}>Ajouter Critère</button>
    </div>
  );
}