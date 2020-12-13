/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import InputField, { InputFieldProps } from './InputField';

const useStyles = makeStyles({
  textAreaField: {
    marginTop: 3,
  },
});

interface TextAreaFieldProps extends InputFieldProps {
  rows?: number,
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const { rows } = props;
  const classes = useStyles();
  return (
    <InputField
      multiline
      rows={rows || 4}
      variant="outlined"
      className={classes.textAreaField}
      {
        ...props
      }
    />
  );
};

export default TextAreaField;
