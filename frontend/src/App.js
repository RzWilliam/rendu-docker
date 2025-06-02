import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/notes')
      .then(res => setNotes(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3001/notes', form);
    setNotes([...notes, res.data]);
    setForm({ title: '', content: '' });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 MyNotes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Contenu"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Notes :</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong><br />
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
