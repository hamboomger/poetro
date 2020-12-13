import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: 8,
      marginTop: 10,
    },
  },
});

interface Props {
  tags: string[],
}

const PoemTags: React.FC<Props> = ({ tags }) => {
  const classes = useStyles();
  const chips = tags.map((tag) => (
    <Chip key={tag} size="small" label={tag} color="primary" />
  ));
  return (
    <div className={classes.root}>{ chips }</div>
  );
};

export default PoemTags;
