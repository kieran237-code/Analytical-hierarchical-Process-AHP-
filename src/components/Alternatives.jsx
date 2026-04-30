import { useState } from "react";

export default function Alternatives({ criteria, setAlternatives }) {
  const [name, setName] = useState("");
  const [values, setValues] = useState([]);
  const [list, setList] = useState([]);

  const add = () => {
    if (!name) return;

    const newAlt = { name, values };
    const updated = [...list, newAlt];

    setList(updated);
    setAlternatives(updated);

    setName("");
    setValues([]);
  };

  return (
    <div>
      <h3>Alternatives</h3>

      <input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {criteria.map((c, i) => (
        <input
          key={i}
          placeholder={c}
          onChange={(e) => {
            const newVals = [...values];
            newVals[i] = parseFloat(e.target.value);
            setValues(newVals);
          }}
        />
      ))}

      <button onClick={add}>Ajouter</button>

      <ul>
        {list.map((alt, i) => (
          <li key={i}>
            {alt.name} → {alt.values.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
