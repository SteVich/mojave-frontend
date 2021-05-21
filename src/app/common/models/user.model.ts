export class User {
  id: number;

  name: string;
  username: string
  email: string
  imageUrl: string;

  constructor(id: number, username: string, imageUrl: string) {
    this.id = id;
    this.username = username;
    this.imageUrl = imageUrl;
  }


}
