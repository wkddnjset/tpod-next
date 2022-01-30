import { FieldErrors } from 'react-hook-form';

export interface ContentType {
  type: 'social' | 'email' | 'email-with-social' | 'phone';
}
export interface SocialType {
  clientId: string;
  kind: 'KAKAO' | 'NAVER' | 'APPLE' | 'GOOGLE' | 'FACEBOOK';
  keyId: string;
  teamId: string;
  isMain: boolean;
}
export interface FieldType {
  order: number;
  type: 'STRING' | 'NUMBER';
  minLength: number;
  maxLength: number;
  required: boolean;
  helpText: string;
  name: string;
}

export interface BrandProps {
  name: string;
  backgroundImage: string;
  logoImage: string;
  domain: string;
  isEmailLogin: boolean;
  isPhoneLogin: boolean;
  socialSet: SocialType[];
  fieldSet: FieldType[];
}

export type FormValues = {
  email: string;
  password: string;
};

export interface LoginContentProps {
  brand: BrandProps;
}

export interface EmailLoginFormType {
  register: any;
  errors: FieldErrors;
  brand: BrandProps;
  isRegister: boolean | null;
  isLoading: boolean;
  setIsRegister: (e: boolean | null) => void;
}
