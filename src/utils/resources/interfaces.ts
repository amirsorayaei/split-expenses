export interface Group {
  id?: number;
  name: string;
  currency: string;
  users: User[];
  expenses?: Expense[];
  balances?: Balance[];
  createdAt?: string;
  updatedAt?: string;
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
  updatedAt?: string;
}

export interface Balance {
  id?: number;
  from: User;
  to: User;
  amount: number;
  isPaid: boolean;
  paidAmount: number;
}
