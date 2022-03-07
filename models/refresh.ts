import UserDTO from "./userDTO";

export interface RefreshApiResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}
