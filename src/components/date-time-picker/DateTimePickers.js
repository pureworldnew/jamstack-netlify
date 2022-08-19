import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export function DateTimePickers() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="Pp"
      className="custom-datepicker"
    />
  );
}
