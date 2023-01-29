import { scenesFull } from './image-maps';

const scenes = [
  {
    id: 0,
    title: 'On the Beach',
    imageSrc: scenesFull.get('beach'),
    width: 3000,
    height: 1926,
  },
  {
    id: 1,
    title: 'Ski Slopes',
    imageSrc: scenesFull.get('slopes'),
    width: 3000,
    height: 1902,
  },
  {
    id: 2,
    title: 'Sports Stadium',
    imageSrc: scenesFull.get('stadium'),
    width: 3000,
    height: 1899,
  },
];

Object.freeze(scenes);

export default scenes;
