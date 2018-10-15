const config = require(`./config`);

export const KIND_PARK = "park";
export const KIND_TRAIN = "train";
export const KIND_SHIP = "ship";
export const KIND_FISHING = "fishing";
export const KIND_DEFAULT = "default";

export default (keyword: string) => {
  const keys = Object.keys(config);

  let result = keys.map(key => {
    const items = config[key];

    return {
      kind: key,
      score: items
        .filter((item: string) => keyword.indexOf(item) !== -1)
        .join("").length
    };
  });

  result = [
    ...result,
    {
      kind: KIND_DEFAULT,
      score: 1
    }
  ];

  const scores = result.map(item => item.score);
  const maxScore = Math.max(...scores);

  const maxItem: any = result.find(item => item.score === maxScore);

  return maxItem.kind;
};
