import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  textToDisplay: string
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderBottom: '1px solid lightgray',
    width: '100%',
  },
  content: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontWeight: 500,
    fontSize: 16,
    color: 'lightgray',
  },
}));

const DividerWithText: React.FC<Props> = ({ textToDisplay }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>{textToDisplay}</span>
      <div className={classes.border} />
    </div>
  );
};

export default DividerWithText;
