import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export function Payment() {
  const { booking, updateBooking, getTotalPrice } = useBooking();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: booking.paymentInfo || undefined,
  });

  if (!booking.selectedRoom || !booking.guestInfo) {
    navigate('/');
    return null;
  }

  const totalPrice = getTotalPrice();
  const serviceFee = totalPrice * 0.1;
  const taxes = totalPrice * 0.05;
  const finalTotal = totalPrice + serviceFee + taxes;

  const onSubmit = (data: PaymentFormData) => {
    updateBooking({ paymentInfo: data });
    // Simulate payment processing
    setTimeout(() => {
      navigate('/confirmation');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/summary')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagamento</h1>
          <p className="text-gray-600">Conclua sua reserva com segurança</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Informações de Pagamento
                </CardTitle>
                <CardDescription>
                  Os dados são criptografados e seguros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão *</Label>
                    <Input
                      id="cardNumber"
                      {...register('cardNumber', {
                        required: 'Número do cartão é obrigatório',
                        pattern: {
                          value: /^\d{16}$/,
                          message: 'Digite 16 números',
                        },
                      })}
                      placeholder="0000 0000 0000 0000"
                      maxLength={16}
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-600 mt-1">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  {/* Card Holder */}
                  <div>
                    <Label htmlFor="cardHolder">Nome no Cartão *</Label>
                    <Input
                      id="cardHolder"
                      {...register('cardHolder', {
                        required: 'Nome no cartão é obrigatório',
                      })}
                      placeholder="Nome como está no cartão"
                    />
                    {errors.cardHolder && (
                      <p className="text-sm text-red-600 mt-1">{errors.cardHolder.message}</p>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Validade *</Label>
                      <Input
                        id="expiryDate"
                        {...register('expiryDate', {
                          required: 'Validade é obrigatória',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: 'Use formato MM/AA',
                          },
                        })}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-600 mt-1">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="password"
                        {...register('cvv', {
                          required: 'CVV é obrigatório',
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: 'Digite 3 ou 4 números',
                          },
                        })}
                        placeholder="000"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-600 mt-1">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900 mb-1">Pagamento Seguro</p>
                        <p className="text-sm text-green-700">
                          Seus dados são protegidos com criptografia de ponta a ponta.
                          Este é um ambiente de demonstração e não processa pagamentos reais.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    <Lock className="mr-2 w-5 h-5" />
                    Confirmar Pagamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Total a Pagar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Taxa de serviço</span>
                    <span>R$ {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Impostos</span>
                    <span>R$ {taxes.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-indigo-600">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Booking Summary */}
                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quarto</span>
                    <span className="font-medium">{booking.selectedRoom.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Hóspedes</span>
                    <span className="font-medium">
                      {booking.adults + booking.children.length} pessoa(s)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
