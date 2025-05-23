'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  time: string;
  description?: string;
  color?: 'blue' | 'pink' | 'green' | 'purple' | 'orange';
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: Event[] = [
    { id: '1', title: 'Aptitude Test - Infosys', time: '9:00 AM', description: 'Online test for all registered candidates', color: 'blue' },
    { id: '2', title: 'Technical Interview - TCS', time: '11:30 AM', description: 'Panel Interview for shortlisted students - Lab 203', color: 'green' },
    { id: '3', title: 'HR Round - Wipro', time: '2:00 PM', description: 'HR interaction session - Conference Room A', color: 'pink' },
    { id: '4', title: 'Placement Results Announcement', time: '4:30 PM', description: 'Results of todays interviews will be shared via portal', color: 'purple' },
    { id: '5', title: 'Resume Screening - HCL', time: '6:00 PM', description: 'Initial resume shortlisting round', color: 'blue' }
  ];

  const getEventColorClass = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:border-blue-800',
      pink: 'text-pink-600 bg-pink-50 border-pink-200 dark:text-pink-400 dark:bg-pink-950 dark:border-pink-800',
      green: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800',
      purple: 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950 dark:border-purple-800',
      orange: 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const formatMonthYear = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    alert('Add event functionality would be implemented here');
  };

  const handleEventClick = (event: Event) => {
    alert(`Clicked on: ${event.title} at ${event.time}`);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekDay = firstDay.getDay();

    const days = [];

    const prevMonth = new Date(year, month, 0).getDate();
    for (let i = startWeekDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        date: new Date(year, month - 1, prevMonth - i)
      });
    }

    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      days.push({
        day,
        isCurrentMonth: true,
        isToday: dateObj.toDateString() === today.toDateString(),
        isSelected: dateObj.toDateString() === selectedDate.toDateString(),
        date: dateObj
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  };

  const hourlySlots = Array.from({ length: 18 }, (_, i) => {
    const hour = i + 6;
    const suffix = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}${suffix}`;
  });

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex gap-6 p-6">
      <div className="w-[70%]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-foreground">
            {formatDate(selectedDate)}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
            <Button variant="outline" size="sm">Day view</Button>
            <Button size="sm" onClick={handleAddEvent} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-1" /> Add event
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="space-y-4 p-4">
              {hourlySlots.map(time => (
                <div key={time} className="flex items-start gap-4 min-h-[60px]">
                  <div className="w-16 text-sm text-muted-foreground font-medium">{time}</div>
                  <div className="flex-1 border-l border-border pl-4">
                    {events
                      .filter(event => event.time.includes(time.slice(0, -2)))
                      .map(event => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors hover:shadow-sm ${getEventColorClass(event.color || 'blue')}`}
                        >
                          <div className="font-medium text-sm">{event.time}</div>
                          <div className="font-semibold">{event.title}</div>
                          {event.description && <div className="text-sm opacity-80 mt-1">{event.description}</div>}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-[30%]">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="font-semibold">{formatMonthYear(currentDate)}</h2>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  onClick={() => selectDate(day.date)}
                  className={`h-8 w-8 p-0 font-normal ${
                    !day.isCurrentMonth ? 'text-muted-foreground opacity-50' : ''
                  } ${
                    day.isToday ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                  } ${
                    day.isSelected && !day.isToday ? 'bg-accent text-accent-foreground' : ''
                  } hover:bg-accent hover:text-accent-foreground`}
                >
                  {day.day}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;