export interface Group {
  id: number;
  name: string;
  users: User[];
  totalExpense: number;
  expenses?: Expense[];
}

export interface User {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  name: string;
  users: User[];
  amount: number;
  createdAt: string;
}

export interface UserWithShare {
  username: string;
  share: number;
}

export interface MaterialSelect {
  id: number;
  name: string;
}
