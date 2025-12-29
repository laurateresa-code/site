import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { ArrowRight, ArrowLeft, CalendarIcon, Users, Hotel, User, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function BookingSummary() {
  const { booking, getTotalNights, getTotalPrice } = useBooking();
  const navigate = useNavigate();

  if (!booking.selectedRoom || !booking.guestInfo) {
    navigate('/');
    return null;
  }

  const nights = getTotalNights();
  const totalPrice = getTotalPrice();
  const serviceFee = totalPrice * 0.1;
  const taxes = totalPrice * 0.05;
  const finalTotal = totalPrice + serviceFee + taxes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/guests')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resumo da Reserva</h1>
          <p className="text-gray-600">Revise os detalhes antes de prosseguir</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="w-5 h-5" />
                  Quarto Selecionado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{booking.selectedRoom.name}</h3>
                <p className="text-gray-600 mb-4">{booking.selectedRoom.description}</p>
                <div className="flex flex-wrap gap-2">
                  {booking.selectedRoom.amenities.map((amenity, index) => (
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

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Datas da Estadia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Check-in</p>
                    <p className="font-semibold">
                      {booking.checkIn && format(booking.checkIn, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Check-out</p>
                    <p className="font-semibold">
                      {booking.checkOut && format(booking.checkOut, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-center font-semibold text-indigo-600">
                  {nights} {nights === 1 ? 'noite' : 'noites'}
                </p>
              </CardContent>
            </Card>

            {/* Guests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Hóspedes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                      <div className="space-y-2">
                        {booking.children.map((child, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Criança {index + 1}</span>
                            <span>{child.age} {child.age === 1 ? 'ano' : 'anos'}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Responsável pela Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>
                    {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{booking.guestInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{booking.guestInfo.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo de Preços</CardTitle>
                <CardDescription>Detalhamento dos valores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      R$ {booking.selectedRoom.price} x {nights} {nights === 1 ? 'noite' : 'noites'}
                    </span>
                    <span className="font-semibold">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taxa de serviço</span>
                    <span className="font-semibold">R$ {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Impostos</span>
                    <span className="font-semibold">R$ {taxes.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-indigo-600">R$ {finalTotal.toFixed(2)}</span>
                </div>

                <Button onClick={() => navigate('/payment')} className="w-full" size="lg">
                  Ir para Pagamento
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Você não será cobrado ainda. O pagamento será processado após a confirmação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
