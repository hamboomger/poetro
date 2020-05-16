import { CardHeader, Divider } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  header: string;
}

const useStyles = makeStyles({
  header: {
    fontSize: 10,
    textAlign: 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
});

const PoemHeader: React.FC<Props> = ({ header }) => {
  const classes = useStyles();
  return (
    <>
      <CardHeader title={header} className={classes.header} />
      <Divider />
    </>
  );
};

export default PoemHeader;
