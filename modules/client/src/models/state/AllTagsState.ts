export interface TagView {
  name: string,
  color: string
}

export default interface AllTagsState {
  data: TagView[],
  isFetching: boolean,
}
