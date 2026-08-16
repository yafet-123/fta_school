import React, { useState } from 'react';

export function DisplayFormula({ subjects }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', link: '' });

  const startEdit = (f) => {
    setEditId(f.id);
    setEditForm({ name: f.name, link: f.link });
  };

  const saveEdit = async (id) => {
    await fetch(`/api/formula/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditId(null);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this formula sheet?')) return;
    await fetch(`/api/formula/delete/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Formula Sheets</h2>
      {subjects.map((subject) =>
        subject.FormulaSheet && subject.FormulaSheet.length > 0 ? (
          <div key={subject.id} className="mb-6">
            <h3 className="font-semibold text-lg text-blue-700 mb-2 border-b pb-1">{subject.name}</h3>
            <div className="flex flex-col gap-3">
              {subject.FormulaSheet.map((f) => (
                <div key={f.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 gap-2">
                  {editId === f.id ? (
                    <div className="flex gap-2 flex-1 flex-wrap">
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="border rounded p-1 text-sm flex-1"
                        placeholder="Name"
                      />
                      <input
                        value={editForm.link}
                        onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                        className="border rounded p-1 text-sm flex-1"
                        placeholder="Link"
                      />
                      <button onClick={() => saveEdit(f.id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{f.name}</p>
                        <a href={f.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">{f.link}</a>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(f)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                        <button onClick={() => handleDelete(f.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
