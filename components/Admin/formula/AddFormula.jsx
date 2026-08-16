import React, { useState } from 'react';

export function AddFormula({ subjects }) {
  const [form, setForm] = useState({ name: '', link: '', subjectId: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/formula/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Formula Sheet added!');
        setForm({ name: '', link: '', subjectId: '' });
        setTimeout(() => window.location.reload(), 600);
      } else {
        setMsg(data.message || 'Error');
      }
    } catch {
      setMsg('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Formula Sheet</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          required
          value={form.subjectId}
          onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded-lg p-2 text-sm"
        />
        <input
          required
          placeholder="Link (URL)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="border rounded-lg p-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? 'Adding...' : 'Add Formula Sheet'}
        </button>
        {msg && <p className="text-sm text-center text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
