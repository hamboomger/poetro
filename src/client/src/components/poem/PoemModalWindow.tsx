import React from 'react';
import { Backdrop, Fade, Modal, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Poem from './model/poem';
import PoemView from './PoemView';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface Props {
  isOpened: boolean,
  poem?: Poem,
  closeModal: () => void,
}

const PoemModalWindow: React.FunctionComponent<Props> = (props) => {
  const styles = useStyles();
  const { isOpened, poem, closeModal } = props;

  return (
    <div>
      <Modal
        className={styles.modal}
        open={isOpened}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpened}>
          {
            poem !== null ? <PoemView poem={poem!} mode="view" /> : null
          }
        </Fade>
      </Modal>
    </div>
  );
};

export default PoemModalWindow;
