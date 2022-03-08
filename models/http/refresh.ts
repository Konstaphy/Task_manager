import UserDTO from "../dtos/userDTO";

export interface RefreshApiResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}
