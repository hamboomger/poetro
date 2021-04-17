export interface TagView {
  id: string,
  name: string,
  color: string
}

export default interface TagsState {
  data: TagView[],
  isFetching: boolean,
}
