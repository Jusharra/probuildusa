export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: number;
  currency?: string;
  interval?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_RwJey5hQC6JdL4',
    priceId: 'price_1R2R1UHHkjtRxo3rfxvwztfb',
    name: 'Membership #1',
    description: 'Premium membership with exclusive benefits',
    mode: 'subscription',
    price: 100, // $1.00 in cents
    currency: 'usd',
    interval: 'month'
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};