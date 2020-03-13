import React from 'react';
import {
  Backdrop, Card, CardContent, CardHeader, Divider, Fade, Modal, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Poem from './model/poem';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    borderRadius: 0,
    backgroundColor: '#fff',
    width: '50%',
    maxHeight: '70%',
    overflow: 'scroll',
  },
  header: {
    fontSize: 10,
    textAlign: 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
  subheader: {
    textAlign: 'left',
  },
  text: {
    textAlign: 'left',
    whiteSpace: 'pre-line',
    overflow: 'scroll',
  },
  timeButton: {
    marginLeft: 'auto',
  },
  bestTimeLabel: {
    paddingRight: '10px',
  },
});

interface Props {
  isOpened: boolean,
  poem?: Poem,
  closeModal: () => void,
}

const PoemModal: React.FunctionComponent<Props> = (props) => {
  const styles = useStyles();
  const { isOpened, poem, closeModal } = props;

  return (
    <div>
      <Modal
        className={styles.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpened}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 800,
        }}
      >
        <Fade in={isOpened} timeout={800}>
          <Card className={styles.root} variant="outlined">
            <CardHeader title={poem?.name} className={styles.header} />
            <Divider />
            <CardContent>
              <Typography className={styles.subheader} color="textSecondary" gutterBottom>
                {poem?.author}
              </Typography>
              <Typography className={styles.text} component="p">
                {poem?.text}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default PoemModal;
