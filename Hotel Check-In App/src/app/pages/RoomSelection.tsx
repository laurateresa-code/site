import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, Room } from '../contexts/BookingContext';
import { rooms } from '../data/rooms';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export function RoomSelection() {
  const { booking, updateBooking, getTotalNights } = useBooking();
  const navigate = useNavigate();
  const nights = getTotalNights();

  const handleSelectRoom = (room: Room) => {
    updateBooking({ selectedRoom: room });
    navigate('/guests');
  };

  if (!booking.checkIn || !booking.checkOut) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Quarto</h1>
          <p className="text-gray-600">
            {nights} {nights === 1 ? 'noite' : 'noites'} selecionada(s)
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className={`overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${
                booking.selectedRoom?.id === room.id ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {booking.selectedRoom?.id === room.id && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-2">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Capacity */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Até {room.capacity} pessoa(s)</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="secondary">+{room.amenities.length - 3}</Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Por noite</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        R$ {room.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Total ({nights} noite(s))</span>
                      <span className="font-semibold">R$ {room.price * nights}</span>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button
                    className="w-full"
                    onClick={() => handleSelectRoom(room)}
                    variant={booking.selectedRoom?.id === room.id ? 'default' : 'outline'}
                  >
                    {booking.selectedRoom?.id === room.id ? 'Selecionado' : 'Selecionar'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
