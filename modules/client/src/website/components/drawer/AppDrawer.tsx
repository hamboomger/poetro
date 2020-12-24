import React from 'react';
import ComponentProps from '../../../models/ComponentProps';
import useWindowDimensions from '../../../util/useWindowDimensions';
import useEffectOnce from '../../../util/useEffectOnce';
import connectStore from '../../connectStore';
import DesktopDrawer from './DesktopDrawer';
import MobileDrawer from './MobileDrawer';

interface Props extends ComponentProps {
  drawerOpened: boolean
  setDrawerOpened(value: boolean): void
}

const AppDrawer: React.FC<Props> = ({
  state, actions, drawerOpened, setDrawerOpened,
}) => {
  const { isDesktopClient } = useWindowDimensions();
  const { isFetching, data: tags } = state.allTags;
  const { loadAllTags } = actions.allTags;

  useEffectOnce(() => {
    if (!tags.length && !isFetching) {
      loadAllTags();
    }
  });

  console.log(`Drawer opened: ${drawerOpened}`);
  return isDesktopClient
    ? <DesktopDrawer />
    : <MobileDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />;
};

export default connectStore(AppDrawer);
