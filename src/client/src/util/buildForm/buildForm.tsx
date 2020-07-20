import _ from 'lodash';
import React, { ReactElement, useState } from 'react';
import { Formik } from 'formik';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import {
  FieldProperties, FormFields, OnFormSubmit, OnFormSubmitAsync,
} from './FormTypes';
import InputField, { InputFieldProps } from '../../website/components/fields/InputField';

const useStyles = makeStyles({
  fieldLabel: {
    padding: '20px 0',
    textAlign: 'right',
  },
  tagsLabel: {
    padding: '7px 0',
    textAlign: 'right',
  },
  submitBtn: {
    margin: '10px auto',
    display: 'block',
  },
});

function createFieldComponentProps(formField: FieldProperties, fieldName: string): InputFieldProps {
  const {
    type, required,
  } = formField;
  const fieldProps: any = {};
  if (required === undefined || required) {
    fieldProps.required = true;
  }
  if (['number', 'email', 'password'].includes(type)) {
    fieldProps.type = type;
  }
  fieldProps.name = fieldName;
  fieldProps.fullWidth = true;
  return fieldProps;
}

function createGridRow(
  { label } : FieldProperties,
  fieldName: string,
  inputFieldElement: ReactElement,
  classes: ClassNameMap,
): ReactElement {
  return (
    <>
      <Grid item xs={3}>
        <Typography className={classes.fieldLabel}>
          {
            label || _.upperFirst(_.lowerCase(fieldName))
          }
        </Typography>
      </Grid>
      <Grid item xs={8}>
        { inputFieldElement }
      </Grid>
    </>
  );
}

export function buildForm<T>(
  formFields: FormFields<T>,
  onSubmit: OnFormSubmit<T> | OnFormSubmitAsync<T>,
  initialValues: T,
): React.ReactElement {
  const [feedbackMessage, setFeedbackMessage] = useState<string>();

  const classes = useStyles();
  const fieldsRows = Object.entries(formFields)
    .map(([fieldName, props]) => {
      const fieldProps = props as FieldProperties;
      const componentProps = createFieldComponentProps(fieldProps, fieldName);
      const inputFieldElement = React.createElement(InputField, componentProps, null);
      return createGridRow(fieldProps, fieldName, inputFieldElement, classes);
    });
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(async (values, formikHelpers) => {
        let response = onSubmit(values);
        if (response instanceof Promise) {
          try {
            response = await response;
          } catch (e) {
            console.log()
          }
        }
      })}
    />
  );
}
