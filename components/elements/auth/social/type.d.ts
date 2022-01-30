import { FieldErrors } from 'react-hook-form';

export interface SocialType {
  clientId: string;
  kind: 'KAKAO' | 'NAVER' | 'APPLE' | 'GOOGLE' | 'FACEBOOK';
  keyId: string;
  teamId: string;
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
  socialSet: SocialType[];
  fieldSet: FieldType[];
}

export type ContentType = {
  brand: BrandProps;
};

export type FormValues = {
  email: string;
  password?: string;
  passwordConfirm?: string;
};

export interface EmailLoginFormType {
  register: any;
  errors: FieldErrors;
  brand: BrandProps;
  isLoading: boolean;
  // socialToken: any;
}
