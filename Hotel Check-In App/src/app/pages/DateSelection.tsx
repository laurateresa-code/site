import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Hotel, CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function DateSelection() {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date | undefined>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(booking.checkOut);

  const handleContinue = () => {
    if (checkIn && checkOut) {
      updateBooking({ checkIn, checkOut });
      navigate('/rooms');
    }
  };

  const isValidSelection = checkIn && checkOut && checkOut > checkIn;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hotel className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Hotel Paradise</h1>
          </div>
          <p className="text-lg text-gray-600">Bem-vindo ao check-in online</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Selecione as Datas
            </CardTitle>
            <CardDescription>
              Escolha as datas de check-in e check-out para sua estadia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Check-in */}
              <div>
                <h3 className="font-semibold mb-4 text-center">Data de Check-in</h3>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  locale={ptBR}
                  className="rounded-md border"
                />
                {checkIn && (
                  <p className="text-center mt-4 text-sm text-gray-600">
                    Check-in: {format(checkIn, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                )}
              </div>

              {/* Check-out */}
              <div>
                <h3 className="font-semibold mb-4 text-center">Data de Check-out</h3>
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => !checkIn || date <= checkIn}
                  locale={ptBR}
                  className="rounded-md border"
                />
                {checkOut && (
                  <p className="text-center mt-4 text-sm text-gray-600">
                    Check-out: {format(checkOut, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            {isValidSelection && (
              <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <p className="text-center text-lg">
                  <span className="font-semibold">
                    {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}
                  </span>{' '}
                  noite(s) selecionada(s)
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!isValidSelection}
                className="w-full md:w-auto"
              >
                Continuar para Quartos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
