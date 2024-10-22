import React from 'react';

const CalendarHeader = ({ year, month, handlePreviousMonth, handleNextMonth }) => {
  return (
    <div className="header">
      {/* Previous month arrow */}
      <button className="monthSelect" onClick={handlePreviousMonth} aria-label="Previous Month">
        &lt;
      </button> 

      {/* Display current year and month */}
      <div className="date" aria-label={`Current month: ${year}年${month}月`}>
        {year}年{month}月
      </div> 

      {/* Next month arrow */}
      <button className="monthSelect" onClick={handleNextMonth} aria-label="Next Month">
        &gt;
      </button> 

    </div>
  );
};

export default CalendarHeader;
