type role = 'administrator' | 'seller';

export type employees = {
  cpf: string;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  biography: string;
  password: string;
  role: role;
};
