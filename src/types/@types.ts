export interface coffes {
  coffes: CoffeeProps[];
}

export interface CoffeeProps {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  amount: number;
  quantity: number;
  variation: [
    {
      name: string;
    }
  ];
}

export interface FormCartCheckout {
  street: string;
  numberHouse: string;
  complementation?: string;
  district: string;
  city: string;
  cod: string;
  state: string;
  payment: string;
}

export type Cep = {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
  uf: string;
};
