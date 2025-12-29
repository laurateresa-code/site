import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowRight, ArrowLeft, UserPlus, Users, Minus, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface GuestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function GuestInformation() {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [adults, setAdults] = useState(booking.adults);
  const [children, setChildren] = useState(booking.children);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormData>({
    defaultValues: booking.guestInfo || undefined,
  });

  if (!booking.selectedRoom) {
    navigate('/rooms');
    return null;
  }

  const totalGuests = adults + children.length;
  const canAddGuest = totalGuests < booking.selectedRoom.capacity;

  const handleAddChild = () => {
    if (canAddGuest) {
      setChildren([...children, { age: 0 }]);
    }
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { age };
    setChildren(updatedChildren);
  };

  const onSubmit = (data: GuestFormData) => {
    updateBooking({
      adults,
      children,
      guestInfo: data,
    });
    navigate('/summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/rooms')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Informações dos Hóspedes</h1>
          <p className="text-gray-600">Preencha os dados dos hóspedes</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Guest Count Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Número de Hóspedes
              </CardTitle>
              <CardDescription>
                Capacidade máxima: {booking.selectedRoom.capacity} pessoa(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Adults */}
              <div>
                <Label className="mb-3 block">Adultos</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-2xl font-semibold w-12 text-center">{adults}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(adults + 1)}
                    disabled={!canAddGuest}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Children */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Crianças</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAddChild}
                    disabled={!canAddGuest}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Adicionar Criança
                  </Button>
                </div>

                {children.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhuma criança adicionada
                  </p>
                ) : (
                  <div className="space-y-3">
                    {children.map((child, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-20">Criança {index + 1}</span>
                        <Select
                          value={child.age.toString()}
                          onValueChange={(value) => handleChildAgeChange(index, parseInt(value))}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Selecione a idade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 18 }, (_, i) => i).map((age) => (
                              <SelectItem key={age} value={age.toString()}>
                                {age} {age === 1 ? 'ano' : 'anos'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveChild(index)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Guest Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Responsável</CardTitle>
              <CardDescription>
                Informações do hóspede principal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'Nome é obrigatório' })}
                    placeholder="Digite seu nome"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Sobrenome *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Sobrenome é obrigatório' })}
                    placeholder="Digite seu sobrenome"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'E-mail inválido',
                    },
                  })}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  {...register('phone', { required: 'Telefone é obrigatório' })}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Continuar para Resumo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
