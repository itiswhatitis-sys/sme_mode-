'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ onClick }) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    onClick?.(day, month, year);
  };

  const generateCalendar = useMemo(() => {
    const calendarDays = [];
    const firstDayOfMonth = new Date(year, selectedMonth, 1).getDay();
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

    // Fill empty slots before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: 0, month: selectedMonth }); // Empty slot
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, month: selectedMonth });
    }

    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return weeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ day, month }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

          return (
            <div
              key={`${month}-${day}-${index}`}
              ref={(el) => { dayRefs.current[index] = el; }}
              data-month={month}
              data-day={day}
              onClick={() => day && handleDayClick(day, month, year)}
              className={`relative m-[-0.5px] aspect-square w-full grow cursor-pointer rounded-xl border dark:border-gray-700 font-medium transition-all sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40
                ${day === 0 ? 'bg-transparent border-none cursor-default' : 'hover:z-20 hover:border-cyan-400 dark:hover:border-cyan-500 z-10'}
              `}
            >
              {day > 0 && (
                <span
                  className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base
                    ${isToday ? 'bg-blue-500 text-white font-semibold' : 'text-slate-800 dark:text-slate-200'}
                  `}
                >
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    ));
  }, [selectedMonth, year]);

  return (
    <div className="calendar-container no-scrollbar max-h-full overflow-y-auto rounded-t-2xl bg-white dark:bg-gray-900 pb-10 text-slate-800 dark:text-slate-200 shadow-xl">
      <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white dark:bg-gray-900 px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Select name="month" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
                <Button
                onClick={handleTodayClick}
                type="button"
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 lg:px-5 lg:py-2.5"
                >
                Today
                </Button>
                <Button
                // Replace with your modal trigger or handler
                className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-all lg:px-5 lg:py-2.5"
                >
                + Add Event
                </Button>
            </div>
            <h1 className="text-xl font-semibold">{monthNames[selectedMonth]} {year}</h1>
            </div>
        <div className="grid w-full grid-cols-7 text-center text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700 py-2">
          {daysOfWeek.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        {generateCalendar}
      </div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({ name, value, label, options = [], onChange, className }: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && <label htmlFor={name} className="mb-2 block font-medium text-slate-800 dark:text-slate-200">{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg className="size-5 text-slate-600 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);