import React from 'react';
import CreatableSelect from 'react-select/creatable';

interface Props {
  initialTags?: string[];
  handleTags: (tags: string[]) => void;
}

const TagsField: React.FC<Props> = ({ handleTags, initialTags }) => (
  <CreatableSelect
    isMulti
    value={
      initialTags?.map((tag) => ({
        label: tag, value: tag,
      })) || []
    }
    onChange={(value?: any) => {
      const options = value as any[];
      const tags = options?.map((option) => option.value) || [];
      handleTags(tags);
    }}
  />
);

export default TagsField;
