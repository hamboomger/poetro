import Poem from '../../website/components/poem/model/poem';

interface Filter {
  searchPhrase?: string
}

export default interface LoadedPoemsState {
  data: Poem[];
  isFetching: boolean;
  filter?: Filter;
}
