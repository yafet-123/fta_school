import React from 'react';

const DisplayMarks = ({ questiontype, studentsByClass, marks }) => {
  return (
    <div className="px-0 lg:px-10 pt-32 w-full">
      {studentsByClass.length == 0 ? (
        <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20 flex flex-col justify-center items-center">
          <p className="text-center font-bold text-[#00225F] text-3xl md:text-3xl lg:text-4xl pt-10 mb-5 leading-10">
            We're working hard to bring you more engaging questions! Unfortunately, there are no questions available at the moment. 
            Please check back later for new content.
          </p>
          <button
            onClick={handleReturn} 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent text-white px-10 py-2 rounded-xl">
            Return
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Student Marks Table</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 border-b">
              <thead className="flex justify-between items-center bg-white w-full border-b">
                <tr className="py-2 px-4 w-[15%]">
                  <th>Student Name</th>
                </tr>
                {questiontype?.map((type) => (
                  <th key={type.question_type_id} className="py-2 px-4 text-center">
                    {type.questiontypeName}
                  </th>
                ))}
              </thead>
              <tbody className="w-full">
                {studentsByClass?.map((student) => (
                  <tr key={student.students_id} className="flex justify-between items-center hover:bg-gray-200 w-full border-b">
                    <td className="py-2 px-4 w-[15%] ">
                      {student.UserName}
                    </td>
                    {questiontype?.map((questionType) => (
                      <td key={questionType.question_type_id} className="py-2 px-4 border-b text-center font-bold">
                        {marks?.[student.students_id]?.[questionType.question_type_id] || '0'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayMarks;
