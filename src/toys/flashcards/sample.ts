export interface Card {
  id: string;
  // Which exam or language the card belongs to.
  tag: string;
  front: string;
  // Pronunciation, where the script needs one.
  reading?: string;
  back: string;
}

export const CARDS: Card[] = [
  {
    id: 'nagareru',
    tag: 'JLPT',
    front: '流れる',
    reading: 'nagareru',
    back: 'to flow',
  },
  {
    id: 'liuli',
    tag: 'HSK',
    front: '流利',
    reading: 'liúlì',
    back: 'fluent',
  },
  { id: 'negotiate', tag: 'TOEIC', front: 'negotiate', back: 'thương lượng' },
  {
    id: 'ubiquitous',
    tag: 'IELTS',
    front: 'ubiquitous',
    back: 'found everywhere',
  },
  {
    id: 'kien-tri',
    tag: 'Tiếng Việt',
    front: 'kiên trì',
    back: 'to persevere',
  },
  { id: 'cam-on', tag: 'Tiếng Việt', front: 'cảm ơn', back: 'thank you' },
];
