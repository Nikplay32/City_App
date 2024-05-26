export class User {
  id: string;
  username: string;
  email: string; // Add this line
  password: string;
  isAdmin: boolean;

  constructor(id: string, username: string, email: string, password: string, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.email = email; // Add this line
    this.password = password;
    this.isAdmin = isAdmin;
  }
}