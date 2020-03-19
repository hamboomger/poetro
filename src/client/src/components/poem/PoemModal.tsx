import React from 'react';
import {
  Backdrop, Card, CardActions, CardContent, CardHeader, Divider, Fade, IconButton, Modal, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Poem from './model/poem';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '50%',
    maxHeight: '70%',
    overflow: 'scroll',
  },
  contentRoot: {
    overflow: 'scroll',
    paddingBottom: 5,
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
            <CardContent className={styles.contentRoot}>
              <Typography className={styles.subheader} color="textSecondary" gutterBottom>
                {poem?.author}
              </Typography>
              <Typography className={styles.text} component="p">
                {poem?.text}
              </Typography>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="view"
                  onClick={() => console.log('something')}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton className={styles.timeButton} aria-label="show timing history">
                  <ScheduleIcon />
                </IconButton>
                <Typography className={styles.bestTimeLabel} component="p">
                  0:00
                </Typography>
              </CardActions>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default PoemModal;
