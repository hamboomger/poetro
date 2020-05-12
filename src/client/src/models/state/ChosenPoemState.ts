import Poem from '../../website/components/poem/model/poem';

type PoemViewType = 'modal' | 'pageView' | 'edit' | 'recording';

export default interface ChosenPoemState {
  poem?: Poem;
  isFetching: boolean,
  viewType?: PoemViewType;
}
