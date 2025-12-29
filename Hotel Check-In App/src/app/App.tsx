import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import { DateSelection } from './pages/DateSelection';
import { RoomSelection } from './pages/RoomSelection';
import { GuestInformation } from './pages/GuestInformation';
import { BookingSummary } from './pages/BookingSummary';
import { Payment } from './pages/Payment';
import { Confirmation } from './pages/Confirmation';

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<DateSelection />} />
          <Route path="/rooms" element={<RoomSelection />} />
          <Route path="/guests" element={<GuestInformation />} />
          <Route path="/summary" element={<BookingSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}
