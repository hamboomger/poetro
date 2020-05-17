interface Poem {
  _id: string,
  name?: string,
  author: string
  text: string,
  tags: string[],
}

export default Poem;
