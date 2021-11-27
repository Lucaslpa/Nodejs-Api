type status = 'available' | 'reserved' | 'sold';

export type vehicle = {
  id?: number;
  price: number;
  brand: string;
  model: string;
  year: string;
  status: status;
  color: string;
  chassi: string;
  km: number;
};
