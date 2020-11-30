import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';
import InputField from '../../fields/InputField';
import TextAreaField from '../../fields/TextAreaField';
import TagsField from './TagsField';
import Poem from '../model/poem';
import FeedbackPanel from '../../common/FeedbackPanel';

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

const validationSchema = Yup.object().shape({
  author: Yup.string().required(),
  name: Yup.string(),
  text: Yup.string().required(),
  targetTimeSec: Yup.number().required(),
});

const initialValues: Poem = {
  _id: undefined,
  author: '',
  text: '',
  name: '',
  targetTimeSec: 60,
  tags: [],
};

interface Props extends ComponentProps {
  poem?: Poem
}

async function onSubmit(poem: any, actions: FormikHelpers<any>): Promise<boolean> {
  try {
    if (poem._id) {
      await axios.put(`/api/poem/${poem._id}`, poem);
    } else {
      await axios.post('/api/poem', poem);
    }
    actions.setSubmitting(false);
    actions.setStatus('success');
    return true;
  } catch (e) {
    console.log('Error occurred on form submit: ', e);
    actions.setStatus('error');
    return false;
  }
}

const PoemForm: React.FC<Props> = ({ poem, actions: reduxActions }) => {
  const classes = useStyles();
  const history = useHistory();
  const { loadAllTags } = reduxActions.allTags;

  return (
    <Formik
      enableReinitialize
      initialValues={poem || initialValues}
      onSubmit={async (values: any, actions: FormikHelpers<any>) => {
        const submittedSuccessfully = await onSubmit(values, actions);
        if (submittedSuccessfully) {
          loadAllTags();
          setTimeout(() => history.push('/'), 1000);
        }
      }}
      validationSchema={validationSchema}
      render={({ status, setFieldValue, values }) => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <FeedbackPanel
              status={status}
              successMsg={`Poem ${values._id !== undefined ? 'saved' : 'created'}`}
              errorMsg="Failed to save poem"
            />
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Author:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                name="author"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField fullWidth name="name" />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Text:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextAreaField
                required
                fullWidth
                rows={10}
                name="text"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Target time (seconds):
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                type="number"
                name="targetTimeSec"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.tagsLabel}>
                Tags:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TagsField
                initialTags={values.tags}
                handleTags={(tags: string[]) => setFieldValue('tags', tags)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.submitBtn}
                type="submit"
                variant="outlined"
                color="secondary"
              >
                {
                  values._id ? 'Save' : 'Create'
                }
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default connectStore(PoemForm);
