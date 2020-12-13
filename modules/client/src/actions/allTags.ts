import axios from 'axios';
import AllTagsActionCreator, { AddAnyNewTagsAction, TagsLoadedAction } from './interfaces/AllTagsActionCreator';
import AppThunk from '../util/AppThunk';

export const TAGS_LOADING = 'TAGS_LOADING';
export const TAGS_LOADED = 'TAGS_LOADED';
export const TAGS_LOADING_FAILED = 'TAGS_LOADING_FAILED';
export const ADD_ANY_NEW_TAGS = 'TAGS_LOADING_FAILED';

const allTagsActionCreator: AllTagsActionCreator = {
  loadAllTags(): AppThunk {
    return ((dispatch) => {
      console.log('Loading all tags!!!');
      dispatch({ type: TAGS_LOADING });
      axios.get('/api/tags')
        .then((res) => {
          dispatch<TagsLoadedAction>({
            type: TAGS_LOADED,
            payload: (res.data as string[]),
          });
        })
        .catch(() => {
          dispatch({ type: TAGS_LOADING_FAILED });
        });
    });
  },
  addAnyNewTags(tags: string[]): AddAnyNewTagsAction {
    return {
      type: ADD_ANY_NEW_TAGS,
      payload: tags,
    };
  },
};

export default allTagsActionCreator;
