export class Invite {

  emails: string[];
  message: string;

  constructor(emails: string[], message: string) {
    this.emails = emails;
    this.message = message;
  }
}
