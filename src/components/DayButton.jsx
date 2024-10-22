import React from 'react';

const DayButton = ({ day, handleClick, date, startDate, endDate }) => {
  // Define classNames based on conditions
  const classNames = [
    "dayButton",
    day === date? "today" : "",
    (startDate === day || (endDate && day >= startDate && day <= endDate)) ? "dayInRange" : ""
  ].join(" ").trim(); // Combine the classes and trim for clean output


  return (
    <button 
      className={classNames} 
      onClick={() => handleClick(day)} // Only attach click handler if selectable
    >
      {day}日
    </button>
  );
};

export default DayButton;
