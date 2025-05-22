'use client';

import React from 'react';
import { useSnack } from "@/app/SnackProvider";
import { ContinuousCalendar } from '@/components/calendar';


const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DemoWrapper() {
  const { createSnack } = useSnack();

  const onClickHandler = (day: number, month: number, year: number) => {
    const snackMessage = `Clicked on ${monthNames[month]} ${day}, ${year}`;
    createSnack(snackMessage, 'success');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center dark:bg-black bg-gray-50 px-4 py-8">
      <div className="w-full max-w-6xl rounded-2xl bg-white shadow-md">
        <ContinuousCalendar onClick={onClickHandler} />
      </div>
    </div>
  );
}
