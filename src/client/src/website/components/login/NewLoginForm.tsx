import React from 'react';
import axios from 'axios';
import ComponentProps from '../../../models/ComponentProps';
import { buildForm } from '../../../util/buildForm/buildForm';
import { FormFields, OnFormSubmitAsync } from '../../../util/buildForm/FormTypes';

interface FormValues {
  email: string,
  password: string,
}

const formFields: FormFields<FormValues> = {
  email: { type: 'email' },
  password: { type: 'password' },
};

const NewLoginForm: React.FC<ComponentProps> = () => {
  const onSubmit: OnFormSubmitAsync<FormValues> = async (values) => {
    try {
      await axios.post('/api/login-local', values);
      return { success: true, message: 'Logged in successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return buildForm<FormValues>(formFields, onSubmit, { email: '', password: '' });
};

export default NewLoginForm;
