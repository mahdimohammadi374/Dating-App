export interface IMember {
  id: number;
  userName: string;
  age: string;
  email: string;
  dateOfBirth: Date;
  lastActive: string;
  knownAs: string;
  city: string;
  gender: number;
  country: string;
  interests: string;
  lookingFor: string;
  introduction: string;
  created: string;
  photoUrl: string;
  photos: Photo[];
}
export interface IMemberUpdate {
  email: string;
  knownAs: string;
  city: string;
  country: string;
  interests: string;
  lookingFor: string;
  introduction: string;
}
export interface Photo {
  id: number;
  url: string;
  isMain: boolean;
}
export class userParams {
  constructor(
    public pageNumber: number = 1,
    public pageSize: number = 6,
    public gender: number = Gender.female,
    public minAge: number = 18,
    public maxAge: number = 150,
    public orderBy:OrderBy=OrderBy.created,
    public typeSort:TypeSort=TypeSort.acc
  ) {}
}

export enum Gender {
  female,
  male,
}
export enum OrderBy
{
    lastActive,
    created,
    age
}
export enum TypeSort
{
    acc,
    dec
}