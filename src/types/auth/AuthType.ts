import { registerValidation } from "@/lib/formvalidation/authvalidation";
import {
  ApiFailureError,
  ApiSucessResponse,
} from "../generics/ApiGenericsType";
import { z } from "zod";

export interface UserResponse {
  id: string;
  avatar: string;
  is_verified: boolean;
  is_organizer_registered: boolean;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}

export type UserRegisterPayload = Omit<
  z.infer<typeof registerValidation>,
  "confirmPassword"
>;

export type AuthRegisterResponse = ApiSucessResponse<UserResponse>;

export type AuthRegisterErrorResponse = ApiFailureError<string>;

export interface LoginSucess {
  id: string;
  access_token: string;
  role: string;
  is_verified: boolean;
  is_organizer_registered: boolean;
}

export type LoginFailure = ApiFailureError<[]>;
