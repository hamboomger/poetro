export interface TagView {
  name: string,
  color: string
}

export default interface TagsState {
  data: TagView[],
  isFetching: boolean,
}
