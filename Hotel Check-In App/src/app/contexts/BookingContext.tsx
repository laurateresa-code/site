import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Child {
  age: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
}

export interface BookingData {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  selectedRoom: Room | null;
  adults: number;
  children: Child[];
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
  paymentInfo: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  } | null;
}

interface BookingContextType {
  booking: BookingData;
  updateBooking: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
  getTotalNights: () => number;
  getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBooking: BookingData = {
  checkIn: undefined,
  checkOut: undefined,
  selectedRoom: null,
  adults: 1,
  children: [],
  guestInfo: null,
  paymentInfo: null,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(initialBooking);

  const updateBooking = (data: Partial<BookingData>) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);
  };

  const getTotalNights = () => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const diff = booking.checkOut.getTime() - booking.checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getTotalPrice = () => {
    if (!booking.selectedRoom) return 0;
    return booking.selectedRoom.price * getTotalNights();
  };

  return (
    <BookingContext.Provider
      value={{ booking, updateBooking, resetBooking, getTotalNights, getTotalPrice }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
