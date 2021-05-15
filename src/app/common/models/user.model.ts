export class User {

  id: number;
  name: string;
  username: string
  email: string

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
