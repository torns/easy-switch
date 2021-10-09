export interface SystemType {
  id: string | undefined;
  title: string | undefined;
  urls: string[];
  sort: number | undefined;
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
  sort: number | undefined;
}
