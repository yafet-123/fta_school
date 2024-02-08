// pages/announcements.js

import React from 'react';

const announcementsData = [
  {
    id: 1,
    teacher:"yafet",
    title: 'Important Announcement',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2024-02-15',
  },
  {
    id: 2,
    teacher:"yafet",
    title: 'Important Announcement',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2024-02-15',
  },

  {
    id: 3,
    teacher:"yafet",
    title: 'Important Announcement',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2024-02-15',
  },
];

const Announcements = () => {
  return (
    <div className="w-full px-5 bg-white rounded-lg p-8 shadow-md lg:ml-5">
      <h1 className="text-center text-2xl font-bold mb-5">Announcements</h1>
      <ul>
        {announcementsData.map((announcement) => (
          <li key={announcement.id} className="p-2 bg-gray-200 rounded-lg mb-5">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
              <h2 className="text-md font-normal">{announcement.teacher}</h2>
              <p className="text-md font-normal">{announcement.date}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">{announcement.title}</h2>
            <p className="text-lg font-semibold">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
