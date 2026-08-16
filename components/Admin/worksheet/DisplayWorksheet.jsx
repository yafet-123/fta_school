import React, { useState } from 'react';

export function DisplayWorksheet({ subjects }) {
  const [editTopicId, setEditTopicId] = useState(null);
  const [editTopicTitle, setEditTopicTitle] = useState('');
  const [editSheetId, setEditSheetId] = useState(null);
  const [editSheetForm, setEditSheetForm] = useState({ title: '', link: '' });

  const saveTopicEdit = async (id) => {
    await fetch(`/api/worksheet/topic/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTopicTitle }),
    });
    setEditTopicId(null);
    window.location.reload();
  };

  const deleteTopic = async (id) => {
    if (!confirm('Delete this topic and all its worksheets?')) return;
    await fetch(`/api/worksheet/topic/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  const saveSheetEdit = async (id) => {
    await fetch(`/api/worksheet/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editSheetForm),
    });
    setEditSheetId(null);
    window.location.reload();
  };

  const deleteSheet = async (id) => {
    if (!confirm('Delete this worksheet?')) return;
    await fetch(`/api/worksheet/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Worksheets</h2>
      {subjects.map((subject) =>
        subject.WorksheetTopic && subject.WorksheetTopic.length > 0 ? (
          <div key={subject.id} className="mb-8">
            <h3 className="font-bold text-xl text-green-700 mb-3 border-b pb-2">{subject.name}</h3>
            {subject.WorksheetTopic.map((topic) => (
              <div key={topic.id} className="mb-4 ml-2">
                <div className="flex items-center justify-between mb-2 bg-green-50 rounded-lg px-3 py-2">
                  {editTopicId === topic.id ? (
                    <div className="flex gap-2 flex-1">
                      <input value={editTopicTitle} onChange={(e) => setEditTopicTitle(e.target.value)} className="border rounded p-1 text-sm flex-1" />
                      <button onClick={() => saveTopicEdit(topic.id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                      <button onClick={() => setEditTopicId(null)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span className="font-semibold text-green-800">{topic.title}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditTopicId(topic.id); setEditTopicTitle(topic.title); }} className="bg-amber-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                        <button onClick={() => deleteTopic(topic.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {topic.Worksheets && topic.Worksheets.map((sheet) => (
                    <div key={sheet.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 gap-2">
                      {editSheetId === sheet.id ? (
                        <div className="flex gap-2 flex-1 flex-wrap">
                          <input value={editSheetForm.title} onChange={(e) => setEditSheetForm({ ...editSheetForm, title: e.target.value })} className="border rounded p-1 text-sm flex-1" placeholder="Title" />
                          <input value={editSheetForm.link} onChange={(e) => setEditSheetForm({ ...editSheetForm, link: e.target.value })} className="border rounded p-1 text-sm flex-1" placeholder="Link" />
                          <button onClick={() => saveSheetEdit(sheet.id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Save</button>
                          <button onClick={() => setEditSheetId(null)} className="bg-gray-300 px-3 py-1 rounded text-sm">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{sheet.title}</p>
                            <a href={sheet.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">{sheet.link}</a>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => { setEditSheetId(sheet.id); setEditSheetForm({ title: sheet.title, link: sheet.link }); }} className="bg-amber-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                            <button onClick={() => deleteSheet(sheet.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}
