export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserCreateDTOInterface extends Omit<UserInterface, 'id'> {}
