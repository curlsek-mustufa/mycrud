import { useState, useEffect } from 'react';

export default function UserForm({ initial, onSubmit }) {
  // stable default to avoid creating a new object on every render
  const defaultInitial = { name: '', email: '', country: '', occupation: '' };
  const [form, setForm] = useState(() => (initial ?? defaultInitial));
  const [loading, setLoading] = useState(false);

  // only sync when a real `initial` prop is provided (e.g. for edit forms)
  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Name</label><br />
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label><br />
        <input name="email" value={form.email} onChange={handleChange} type="email" required />
      </div>
      <div>
        <label>Country</label><br />
        <input name="country" value={form.country} onChange={handleChange} />
      </div>
      <div>
        <label>Occupation</label><br />
        <input name="occupation" value={form.occupation} onChange={handleChange} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}
