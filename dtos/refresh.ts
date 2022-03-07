import UserDTO from "./userDTO";

export interface RefreshApiResponse {
  access_token: string;
  refresh_token: string;
  user: UserDTO;
}
