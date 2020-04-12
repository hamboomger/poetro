import Poem from '../../website/components/poem/model/poem';

type PoemViewType = 'modal' | 'pageView' | 'edit' | 'recording' | undefined;

export default interface ChosenPoemState {
  poem?: Poem;
  viewType: PoemViewType;
}
