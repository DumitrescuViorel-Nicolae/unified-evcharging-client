export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface UserState extends User {
  loading: boolean;
  error: string | null;
}
