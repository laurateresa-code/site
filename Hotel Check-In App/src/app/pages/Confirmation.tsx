import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { CheckCircle, CalendarIcon, Hotel, Users, Mail, Home } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Confirmation() {
  const { booking, resetBooking, getTotalNights } = useBooking();
  const navigate = useNavigate();

  if (!booking.selectedRoom || !booking.guestInfo || !booking.paymentInfo) {
    navigate('/');
    return null;
  }

  const nights = getTotalNights();
  const bookingId = `BK${Date.now().toString().slice(-8)}`;

  const handleNewBooking = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h1>
          <p className="text-lg text-gray-600">
            Seu check-in foi realizado com sucesso
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-center text-2xl">
              Número da Reserva
            </CardTitle>
            <CardDescription className="text-center text-xl font-mono font-bold text-green-700">
              {bookingId}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Dates Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Datas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check-in</p>
                <p className="font-semibold">
                  {booking.checkIn && format(booking.checkIn, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-500">A partir das 14:00</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-600 mb-1">Check-out</p>
                <p className="font-semibold">
                  {booking.checkOut && format(booking.checkOut, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-gray-500">Até às 12:00</p>
              </div>
              <Separator />
              <div className="text-center py-2">
                <p className="text-lg font-semibold text-indigo-600">
                  {nights} {nights === 1 ? 'noite' : 'noites'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Room Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="w-5 h-5" />
                Quarto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xl font-semibold mb-2">
                  {booking.selectedRoom.name}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.selectedRoom.description}
                </p>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {booking.selectedRoom.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guests Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Hóspedes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Adultos</span>
                <span className="font-semibold">{booking.adults}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Crianças</span>
                <span className="font-semibold">{booking.children.length}</span>
              </div>
              {booking.children.length > 0 && (
                <>
                  <Separator />
                  {booking.children.map((child, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Criança {index + 1}</span>
                      <span>{child.age} {child.age === 1 ? 'ano' : 'anos'}</span>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Responsável</p>
                <p className="font-semibold">
                  {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-600 mb-1">E-mail</p>
                <p className="font-medium">{booking.guestInfo.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-600 mb-1">Telefone</p>
                <p className="font-medium">{booking.guestInfo.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Confirmation Notice */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">E-mail de Confirmação Enviado</p>
                <p className="text-sm text-blue-700">
                  Um e-mail com os detalhes da sua reserva foi enviado para{' '}
                  <span className="font-medium">{booking.guestInfo.email}</span>.
                  Guarde o número da reserva para referência futura.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleNewBooking} variant="outline">
            <Home className="mr-2 w-5 h-5" />
            Voltar ao Início
          </Button>
          <Button size="lg" onClick={() => window.print()}>
            Imprimir Confirmação
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Em caso de dúvidas ou alterações, entre em contato conosco através do e-mail
          contato@hotelparadise.com ou pelo telefone (11) 3333-4444
        </p>
      </div>
    </div>
  );
}
