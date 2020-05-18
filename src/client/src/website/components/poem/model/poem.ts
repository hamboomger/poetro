interface Poem {
  _id: string,
  name?: string,
  author: string
  text: string,
  targetTimeSec: number,
  tags: string[],
}

export default Poem;
