import { FieldErrors } from 'react-hook-form';

export type FormValues = {
  username: string;
  password: string;
};

export interface LoginFormType {
  loading: boolean;
  register: any;
  watch: any;
  errors: FieldErrors;
}
