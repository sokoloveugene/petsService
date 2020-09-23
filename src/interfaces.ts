export interface loginResponseInterface  {
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
    confirmed: boolean;
    createdAt: number;
}