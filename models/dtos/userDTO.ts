export interface UserFromDB {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

export default class UserDTO {
  userId;
  name;
  email;

  constructor(model: UserFromDB) {
    this.userId = model.user_id;
    this.name = model.name;
    this.email = model.email;
  }
}
