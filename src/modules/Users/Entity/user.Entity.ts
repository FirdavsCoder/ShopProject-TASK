export class UserEntity {
  login: string;
  password: string;
  balance: number;

  constructor(login: string, password: string, balance: number) {
    this.login = login;
    this.password = password;
    this.balance = balance;
  }
}

