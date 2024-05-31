export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(id: string, username: string, email: string, password: string, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}