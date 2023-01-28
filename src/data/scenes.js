import { scenesFull } from './images';

const SCENES = [
  {
    id: 0,
    title: 'On the Beach',
    image: scenesFull.get('beach'),
    width: 3000,
    height: 1926,
  },
  {
    id: 1,
    title: 'Ski Slopes',
    image: scenesFull.get('slopes'),
    width: 3000,
    height: 1902,
  },
  {
    id: 2,
    title: 'Sports Stadium',
    image: scenesFull.get('stadium'),
    width: 3000,
    height: 1899,
  },
];

Object.freeze(SCENES);

export default SCENES;
