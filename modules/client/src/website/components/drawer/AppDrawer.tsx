import React from 'react';
import ComponentProps from '../../../models/ComponentProps';
import useWindowDimensions from '../../../util/useWindowDimensions';
import useEffectOnce from '../../../util/useEffectOnce';
import connectStore from '../../connectStore';
import DesktopDrawer from './DesktopDrawer';
import MobileDrawer from './MobileDrawer';

const AppDrawer: React.FC<ComponentProps> = ({ state, actions }) => {
  const { isDesktopClient } = useWindowDimensions();
  const { isFetching, data: tags } = state.allTags;
  const { loadAllTags } = actions.allTags;

  useEffectOnce(() => {
    if (!tags.length && !isFetching) {
      loadAllTags();
    }
  });

  return isDesktopClient ? <DesktopDrawer /> : <MobileDrawer />;
};

export default connectStore(AppDrawer);
