import { Room } from '../contexts/BookingContext';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Quarto Standard',
    description: 'Quarto confortável com cama de casal, ideal para casais ou viajantes individuais.',
    price: 250,
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzY2OTc1OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['Wi-Fi', 'TV', 'Ar Condicionado', 'Frigobar'],
  },
  {
    id: '2',
    name: 'Quarto Deluxe',
    description: 'Quarto espaçoso com vista panorâmica e varanda privativa.',
    price: 380,
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjY5NDg0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['Wi-Fi', 'TV 4K', 'Ar Condicionado', 'Minibar', 'Varanda', 'Cofre'],
  },
  {
    id: '3',
    name: 'Suíte Executiva',
    description: 'Suíte luxuosa com sala de estar separada, banheiro de mármore e amenidades premium.',
    price: 550,
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1688741663046-d4b95efb3bd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc29ydCUyMGxvYmJ5fGVufDF8fHx8MTc2NzAzMzU5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['Wi-Fi', 'TV 4K', 'Ar Condicionado', 'Minibar Premium', 'Varanda', 'Cofre', 'Banheira de Hidromassagem', 'Serviço de Quarto 24h'],
  },
];
