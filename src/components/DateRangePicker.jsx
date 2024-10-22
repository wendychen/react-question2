// DateRangePicker.js
import { useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import DayButton from './DayButton';

const DateRangePicker = ({ onDateRangeChange }) => {
  // Get current date information
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const date = today.getDate();

  // State hooks to track the selected start and end dates
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  // Utility function to check for leap years
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Get days in the current month
  const getDaysInMonth = (year, month) => {
    if (month === 1) return isLeapYear(year) ? 29 : 28;
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };

  // Calculate the current month's first and last days
  const currentMonth = thisMonth; // Current month is now fixed
  const currentYear = thisYear; // Current year is now fixed
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  // Calculate days to show from previous and next months
  const lastMonthDaysCount = firstDayOfMonth.getDay();
  const nextMonthDaysCount = 7 - 1 - lastDayOfMonth.getDay();

  // Memoized arrays for current, previous, and next month days
  const currentMonthDays = useMemo(() => Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1), [lastDayOfMonth]);

  const generatePrevMonthDays = () => {
    const prevMonth = (currentMonth === 0 ? 11 : currentMonth - 1);
    const prevYear = (currentMonth === 0 ? currentYear - 1 : currentYear);
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    return Array.from({ length: lastMonthDaysCount }, (_, i) => daysInPrevMonth - lastMonthDaysCount + i + 1);
  };

  const prevMonthDays = useMemo(generatePrevMonthDays, [lastMonthDaysCount, currentMonth, currentYear]);
  const nextMonthDaysArray = useMemo(() => Array.from({ length: nextMonthDaysCount }, (_, i) => i + 1), [nextMonthDaysCount]);

  // Handle clicking on a date
  const handleClick = (clickedDate) => {
    const { startDate } = dateRange;

    // Prevent action if clicked on non-current month day
    if (clickedDate < 1 || clickedDate > lastDayOfMonth.getDate()) {
        return; // Ignore clicks on non-current month days
    }

    if (startDate && clickedDate >= startDate) {
        setDateRange((prev) => ({
            ...prev,
            endDate: clickedDate
        }));
        onDateRangeChange(startDate, clickedDate);
    } else {
        setDateRange((prev) => ({
            ...prev,
            startDate: clickedDate,
            endDate: null
        }));
        onDateRangeChange(clickedDate, null);
    }
  };

  // JSX for rendering the calendar
  return (
    <div className="calendar">
      <CalendarHeader 
        year={currentYear} 
        month={currentMonth + 1} 
      />
      <div className="days">
        {prevMonthDays.map(day => (
          <button key={day} className="dayButton nonCurrentMonthDay">{day}日</button>
        ))}
        {currentMonthDays.map(day => (
          <DayButton 
            key={day} 
            day={day} 
            handleClick={handleClick} 
            date={date}
            startDate={dateRange.startDate} 
            endDate={dateRange.endDate} 
          />
        ))}
        {nextMonthDaysArray.map(day => (
          <button key={day} className="dayButton nonCurrentMonthDay">{day}日</button>
        ))}
      </div>
    </div>
  );
};

export default DateRangePicker;
