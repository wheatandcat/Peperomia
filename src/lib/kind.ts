import Color from 'color';
import { KINDS } from 'peperomia-util';
import s from 'config/style';

type KindData = {
  src: string;
  reversal: {
    src: string;
  };
  name: string;
  backgroundColor: string;
};

export const getKindData = (kind: string): KindData => {
  const config = KINDS[kind];
  const ss = s.schedule;
  const bc = Color(config.backgroundColor)
    .lighten(ss.backgroundColorAlpha)
    .toString();

  return {
    src: config.src,
    reversal: config.reversal,
    name: config.name,
    backgroundColor: bc,
  };
};
