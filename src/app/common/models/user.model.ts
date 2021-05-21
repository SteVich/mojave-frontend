export class User {

  id: number;
  name: string;
  username: string
  email: string
  imageUrl: string;
  role: string;

  constructor(id: number, name: string, username: string, email: string, imageUrl: string, role:string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.imageUrl = imageUrl;
    this.role = role;
  }
}
