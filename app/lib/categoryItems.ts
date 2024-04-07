interface iAppProps {
  name: string
  title: string
  imageUrl: string
  description: string
  id: number
}

export const categoryItems: iAppProps[] = [
  // {
  //   id: 0,
  //   name: 'other',
  //   description: 'This Location is close to the Beach.',
  //   title: '',
  //   imageUrl: '/other.png',
  // },
  {
    id: 1,
    name: 'trending',
    description: 'This is a Location which is trending.',
    title: 'Sugerencias',
    imageUrl:
      'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
  },
]
