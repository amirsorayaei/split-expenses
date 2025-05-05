export interface Group {
  id?: number;
  name: string;
  currency: string;
  users: User[];
  expenses?: Expense[];
}

export interface User {
  id: number;
  name: string;
  share?: number;
}

export interface Expense {
  id?: number;
  name: string;
  users: User[];
  amount: number;
  payor: User;
  createdAt?: string;
}
