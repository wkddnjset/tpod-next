import { FieldErrors } from 'react-hook-form';

export type FormValues = {
  username: string;
  password: string;
};

export interface LoginFormType {
  register: any;
  watch: any;
  errors: FieldErrors;
}
