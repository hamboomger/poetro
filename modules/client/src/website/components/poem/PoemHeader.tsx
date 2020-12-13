import { CardHeader, Divider } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  header: string;
  alignment?: 'left' | 'center' | 'right'
}

const useStyles = makeStyles<any, Props>({
  content: {
    fontSize: 10,
    textAlign: ({ alignment }) => alignment || 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
});

const PoemHeader: React.FC<Props> = (props) => {
  const { header } = props;
  const classes = useStyles(props);
  return (
    <>
      <CardHeader title={header} className={classes.content} />
      <Divider />
    </>
  );
};

export default PoemHeader;
