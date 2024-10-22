// App.js
import React, { useState } from 'react';
import DateRangePicker from './components/DateRangePicker';
import './App.css';

const App = () => {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const handleDateRangeChange = (start, end) => {
    setSelectedRange({ start, end });
  };

  return (
    <div className="App">
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
    </div>
  );
};

export default App;
