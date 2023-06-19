export interface Group {
  id: number;
  name: string;
  users: User[];
  expense: number;
}

export interface User {
  id: number;
  name: string;
}

export interface UserWithShare {
  username: string;
  share: number;
}

export interface MaterialSelect {
  id: number;
  name: string;
}
