import axios from 'axios';
import AppThunk from '../util/AppThunk';
import { TagView } from '../models/state/TagsState';
import TagsActionCreator, {
  AddAnyNewTagsAction, TagColorChangedAction,
  TagsLoadedAction,
} from './interfaces/TagsActionCreator';

export const TAGS_LOADING = 'TAGS_LOADING';
export const TAGS_LOADED = 'TAGS_LOADED';
export const TAGS_LOADING_FAILED = 'TAGS_LOADING_FAILED';
export const ADD_ANY_NEW_TAGS = 'TAGS_LOADING_FAILED';
export const TAG_COLOR_CHANGING = 'TAGS_COLOR_CHANGING';
export const TAG_COLOR_CHANGED = 'TAG_COLOR_CHANGED';
export const TAG_COLOR_CHANGING_FAILED = 'TAG_COLOR_CHANGING_FAILED';

const tagsActionCreator: TagsActionCreator = {
  loadAllTags(): AppThunk {
    return ((dispatch) => {
      dispatch({ type: TAGS_LOADING });
      axios.get('/api/tags')
        .then((res) => {
          dispatch<TagsLoadedAction>({
            type: TAGS_LOADED,
            payload: (res.data as TagView[]),
          });
        })
        .catch(() => {
          dispatch({ type: TAGS_LOADING_FAILED });
        });
    });
  },
  addAnyNewTags(tags: TagView[]): AddAnyNewTagsAction {
    return {
      type: ADD_ANY_NEW_TAGS,
      payload: tags,
    };
  },
  changeTagColor(tagId: string, newColor: string): AppThunk {
    return ((dispatch) => {
      dispatch({ type: TAG_COLOR_CHANGING });
      axios.put(
        `/api/tags/${tagId}/update`, { color: newColor },
      ).then(() => {
        dispatch<TagColorChangedAction>({
          type: TAG_COLOR_CHANGED,
          tagId,
          newColor,
        });
      }, () => {
        dispatch({ type: TAG_COLOR_CHANGING_FAILED });
      });
    });
  },
};

export default tagsActionCreator;
