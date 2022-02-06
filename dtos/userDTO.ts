export interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
}

export default class UserDTO {
  user_id;
  username;
  email;
  role;

  constructor(model: User) {
    this.user_id = model.user_id;
    this.username = model.username;
    this.email = model.email;
    this.role = model.role;
  }
}
