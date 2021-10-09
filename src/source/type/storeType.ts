export interface SystemType {
  [key: string]: any;
  id: string | undefined;
  title: string | undefined;
  urls: string[];
  sort: number;
  autoLogin: boolean;
  showUser?: boolean;
  code?: string;
  userList: Array<UserType>;
}
export interface UserType {
  id: string | undefined;
  name: string | undefined;
  password: string | undefined;
  note: string | undefined;
  sort: number;
}
