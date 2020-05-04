/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export interface InputFieldProps {
  name: string,
  showLabel?: boolean,
  label?: string,
  [propName: string]: any
}

function getLabelToRender(props: InputFieldProps) {
  const { showLabel, required, label } = props;
  if (showLabel === false) {
    return null;
  }
  if (label) {
    return label;
  }
  return required ? 'required' : 'optional';
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name } = props;
  const labelToRender = getLabelToRender(props);
  return (
    <Field
      type="input"
      name={name}
      render={({ field, meta }: { field: any, meta: any }) => (
        <TextField
          label={labelToRender}
          color="secondary"
          error={meta.touched && meta.error}
          helperText={meta.touched ? meta.error : null}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default InputField;
