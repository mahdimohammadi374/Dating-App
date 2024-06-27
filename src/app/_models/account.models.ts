export interface IRequestLogin {
    userName: string;
    password: string;
  }

  export interface IUser {
    id:number,
    username: string;
    token: string;
    photoUrl:string;
    gender:number;
    knownAs:string
    roles?:string[]
  }
  export interface IRequestRegister {
  username: string;
  password: string;
  gender: number;
  dateOfBirth: string;
  knownAs: string;
  city: string;
  country: string;
}