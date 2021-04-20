import React from 'react';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PoemModalPreview from './PoemModalPreview';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PoemModalWindow: React.FC<ComponentProps> = ({ state, actions }) => {
  const styles = useStyles();
  const { poem, viewType } = state.chosenPoem;
  const { closePoemPreview } = actions.chosenPoem;

  const isOpened = viewType === 'modal';

  return (
    <div>
      <Modal
        className={styles.modal}
        open={isOpened}
        onClose={closePoemPreview}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpened}>
          {
            poem ? <PoemModalPreview poem={poem!} /> : <div />
          }
        </Fade>
      </Modal>
    </div>
  );
};

export default connectStore(PoemModalWindow);
