import Poem from '../../website/components/poem/model/poem';

export interface LoadedPoemsFilter {
  tag?: string;
}

export default interface LoadedPoemsState {
  data: Poem[];
  isFetching: boolean;
  filter?: LoadedPoemsFilter;
}
