export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(name: String!): Greeting!\n  user: User\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  createdAt: String!\n  updatedAt: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  used: String!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: Greeting;
  user: User | null;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface Greeting {
  text: string;
  error: boolean;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  used: string;
  createdAt: string;
  updatedAt: string;
}
