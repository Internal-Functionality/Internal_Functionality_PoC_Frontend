import React from 'react';

const Calendar: React.FC = () => {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Octubre 2025</h3>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
                {days.map((day, index) => <div key={index}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
                <div className="p-2"></div>
                <div className="p-2"></div>
                {dates.map(date => (
                    <div key={date} className="p-2 rounded-full hover:bg-blue-200 cursor-pointer">
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;