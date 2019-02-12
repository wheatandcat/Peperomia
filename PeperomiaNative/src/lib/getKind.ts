const config = require(`./config`);

export const KIND_PARK = "park";
export const KIND_TRAIN = "train";
export const KIND_SHIP = "ship";
export const KIND_FISHING = "fishing";
export const KIND_DEFAULT = "default";

export const KINDS: any = {
  [KIND_PARK]: {
    image: "park",
    name: "公園",
    backgroundColor: "#77D353"
  },
  [KIND_TRAIN]: {
    image: "train",
    name: "電車、駅",
    backgroundColor: "#F3B042"
  },
  [KIND_SHIP]: {
    image: "ship",
    name: "船、水上バス",
    backgroundColor: "#00A6FF"
  },
  [KIND_FISHING]: {
    image: "fishing",
    name: "釣り",
    backgroundColor: "#00A6FF"
  },
  [KIND_DEFAULT]: {
    image: null,
    name: "地球",
    backgroundColor: "#969FAA"
  }
};

export default (keyword: string) => {
  if (!keyword) {
    return KIND_DEFAULT;
  }

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
