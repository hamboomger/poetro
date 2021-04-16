import React from 'react';
import CreatableSelect from 'react-select/creatable';
import useEffectOnce from '../../../../util/useEffectOnce';
import connectStore from '../../../connectStore';
import ComponentProps from '../../../../models/ComponentProps';

interface Options {
  label: string,
  value: string,
}

interface Props extends ComponentProps {
  initialTags?: string[];
  handleTags: (tags: string[]) => void;
}

function mapToOptions(tags: string[]): Options[] {
  return tags.map((tag) => ({
    label: tag, value: tag,
  }));
}

const TagsField: React.FC<Props> = (props) => {
  const {
    state, actions, handleTags, initialTags,
  } = props;
  const { loadAllTags } = actions.allTags;
  const { data: allTags, isFetching: tagsFetching } = state.allTags;
  const allTagsNames = allTags.map((tag) => tag.name);

  useEffectOnce(() => {
    if (!allTags.length && !tagsFetching) {
      loadAllTags();
    }
  });
  return (
    <CreatableSelect
      isMulti
      isLoading={tagsFetching}
      value={mapToOptions(initialTags || [])}
      options={mapToOptions(allTagsNames)}
      onChange={(value?: any) => {
        const options = value as any[];
        const tags = options?.map((option) => option.value) || [];
        handleTags(tags as string[]);
      }}
    />
  );
};

export default connectStore(TagsField);
