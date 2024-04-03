import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
}
