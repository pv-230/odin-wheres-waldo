// Character imports
import WaldoFull from '../images/characters/waldo-full.webp';
import WendaFull from '../images/characters/wenda-full.webp';
import OdlawFull from '../images/characters/odlaw-full.webp';
import WhitebeardFull from '../images/characters/whitebeard-full.webp';
import WaldoSmall from '../images/characters/small/waldo-small.webp';
import WendaSmall from '../images/characters/small/wenda-small.webp';
import OdlawSmall from '../images/characters/small/odlaw-small.webp';
import WhitebeardSmall from '../images/characters/small/whitebeard-small.webp';

// Scene imports
import BeachFull from '../images/scenes/on-the-beach.webp';
import SlopesFull from '../images/scenes/ski-slopes.webp';
import StadiumFull from '../images/scenes/sports-stadium.webp';
import BeachSmall from '../images/scenes/small/on-the-beach-small.webp';
import SlopesSmall from '../images/scenes/small/ski-slopes-small.webp';
import StadiumSmall from '../images/scenes/small/sports-stadium-small.webp';

// Icon imports
import CheckSvg from '../images/icons/check.svg';
import MarkerSvg from '../images/icons/marker.svg';
import PreviousSvg from '../images/icons/previous.svg';
import NextSvg from '../images/icons/next.svg';
import PlusSvg from '../images/icons/plus.svg';
import MinusSvg from '../images/icons/minus.svg';
import ResetSvg from '../images/icons/reset.svg';

const charactersFull = new Map([
  ['waldo', WaldoFull],
  ['wenda', WendaFull],
  ['odlaw', OdlawFull],
  ['whitebeard', WhitebeardFull],
]);

const charactersCropped = new Map([
  ['waldo', WaldoSmall],
  ['wenda', WendaSmall],
  ['odlaw', OdlawSmall],
  ['whitebeard', WhitebeardSmall],
]);

const scenesFull = new Map([
  ['beach', BeachFull],
  ['slopes', SlopesFull],
  ['stadium', StadiumFull],
]);

const scenesCropped = new Map([
  ['beach', BeachSmall],
  ['slopes', SlopesSmall],
  ['stadium', StadiumSmall],
]);

const icons = new Map([
  ['check', CheckSvg],
  ['marker', MarkerSvg],
  ['previous', PreviousSvg],
  ['next', NextSvg],
  ['plus', PlusSvg],
  ['minus', MinusSvg],
  ['reset', ResetSvg],
]);

export { charactersFull, charactersCropped, scenesFull, scenesCropped, icons };
