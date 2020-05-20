import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  subheader: {
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  author: {
    marginLeft: 5,
  },
});

interface Props {
  author: string,
}

const AuthorName: React.FC<Props> = ({ author }) => {
  const classes = useStyles();
  return (
    <div className={classes.subheader}>
      <FaceIcon fontSize="small" />
      <Typography className={classes.author}>
        {author}
      </Typography>
    </div>
  );
};

export default AuthorName;
