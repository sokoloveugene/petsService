export interface loginResponseInterface {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
}

export interface signUpInterface {
  email: string;
  password: string;
}

export interface consultationRequestInterface {
  userID: string;
  customersName: string;
  animal: string;
  date: number;
  comments: string;
  phone: string;
  confirmed: boolean;
  requestId?: string;
  docAnswer?: string;
  docId?: string;
  time?: string;
  desiredTimeForConsultation?: number;
}

export interface profileDataInterface {
  name: string;
  surname: string;
  expirence: number;
  phone: string;
  photoUrl: string;
  biography: string;
  startCareer: string;
  insta?: string;
}

export type animalTypes = 'cats' | 'dogs' | 'fishes' | 'reptiles' | 'others';

export type categoryTypes =
  | 'food'
  | 'toys'
  | 'medicines'
  | 'accessories'
  | 'charity';

export interface shopItemInterface {
  url: string;
  name: string;
  details: string;
  price: number;
  category: categoryTypes;
  animal: animalTypes;
  available: number;
  itemId?: string;
}
