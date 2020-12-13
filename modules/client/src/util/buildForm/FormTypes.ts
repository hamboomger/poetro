export type TextInputFieldType = 'text' | 'email' | 'password';
export type FieldType = TextInputFieldType | 'textarea' | 'number';

export type FormFields<T> = {
  [P in keyof T]: FieldProperties;
};

export interface FieldProperties {
  type: FieldType,
  value?: string,
  label?: string,
  required?: boolean, // true by default
}

export interface OnFormSubmitResponse {
  success: boolean, message: string
}

// do not merge them, or autocomplete feature won't work on value return
export interface OnFormSubmit<T> {
  (formValues: T): OnFormSubmitResponse
}
export interface OnFormSubmitAsync<T> {
  (formValues: T): Promise<OnFormSubmitResponse>
}
