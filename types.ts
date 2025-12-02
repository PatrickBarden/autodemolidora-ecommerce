export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  compatibility: string[];
  specs: Record<string, string>;
  stock: number;
  isNew: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto' | 'cash';
  deliveryMethod: 'shipping' | 'pickup';
  notes?: string;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'category'; slug: string }
  | { name: 'product'; id: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'search'; query: string }
  | { name: 'account' }
  | { name: 'institutional'; slug: string };
