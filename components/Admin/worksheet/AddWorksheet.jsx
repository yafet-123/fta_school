import React, { useState } from 'react';

export function AddWorksheet({ subjects, topics }) {
  const [tab, setTab] = useState('topic'); // 'topic' | 'worksheet'
  const [topicForm, setTopicForm] = useState({ title: '', subjectId: '' });
  const [sheetForm, setSheetForm] = useState({ title: '', link: '', worksheetTopicId: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    const res = await fetch('/api/worksheet/add-topic', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(topicForm),
    });
    const data = await res.json();
    setMsg(res.ok ? 'Topic added!' : data.message);
    if (res.ok) { setTopicForm({ title: '', subjectId: '' }); setTimeout(() => window.location.reload(), 600); }
    setLoading(false);
  };

  const handleSheetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    const res = await fetch('/api/worksheet/add', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetForm),
    });
    const data = await res.json();
    setMsg(res.ok ? 'Worksheet added!' : data.message);
    if (res.ok) { setSheetForm({ title: '', link: '', worksheetTopicId: '' }); setTimeout(() => window.location.reload(), 600); }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('topic')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'topic' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >Add Topic</button>
        <button
          onClick={() => setTab('worksheet')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'worksheet' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >Add Worksheet</button>
      </div>

      {tab === 'topic' && (
        <form onSubmit={handleTopicSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">Add Worksheet Topic</h2>
          <select required value={topicForm.subjectId} onChange={(e) => setTopicForm({ ...topicForm, subjectId: e.target.value })} className="border rounded-lg p-2 text-sm">
            <option value="">Select Subject</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input required placeholder="Topic Title" value={topicForm.title} onChange={(e) => setTopicForm({ ...topicForm, title: e.target.value })} className="border rounded-lg p-2 text-sm" />
          <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">
            {loading ? 'Adding...' : 'Add Topic'}
          </button>
        </form>
      )}

      {tab === 'worksheet' && (
        <form onSubmit={handleSheetSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">Add Worksheet</h2>
          <select required value={sheetForm.worksheetTopicId} onChange={(e) => setSheetForm({ ...sheetForm, worksheetTopicId: e.target.value })} className="border rounded-lg p-2 text-sm">
            <option value="">Select Topic</option>
            {topics.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <input required placeholder="Worksheet Title" value={sheetForm.title} onChange={(e) => setSheetForm({ ...sheetForm, title: e.target.value })} className="border rounded-lg p-2 text-sm" />
          <input required placeholder="Link (URL)" value={sheetForm.link} onChange={(e) => setSheetForm({ ...sheetForm, link: e.target.value })} className="border rounded-lg p-2 text-sm" />
          <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">
            {loading ? 'Adding...' : 'Add Worksheet'}
          </button>
        </form>
      )}

      {msg && <p className="text-sm text-center text-green-600 mt-3">{msg}</p>}
    </div>
  );
}
