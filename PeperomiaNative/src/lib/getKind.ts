const config = require(`./config`);

export const KIND_FISHING = "fishing";
export const KIND_LUNCH = "lunch";
export const KIND_AMUSEMENT_PARK = "amusement_park";
export const KIND_PARK = "park";
export const KIND_ART_MUSEUM = "art_museum";
export const KIND_HOTEL = "hotel";
export const KIND_HOME = "home";
export const KIND_AQUARIUM = "aquarium";
export const KIND_DEFAULT = "default";
export const KIND_CASTLE = "castle";
export const KIND_ZOO = "zoo";
export const KIND_COFFEE = "coffee";
export const KIND_SHOP = "shop";
export const KIND_TRAIN = "train";
export const KIND_MOVIE = "movie";
export const KIND_BEACH = "beach";
export const KIND_CHERRY_BLOSSOM = "cherry_blossom";
export const KIND_SHIP = "ship";

const host =
  "https://firebasestorage.googleapis.com/v0/b/peperomia-196da.appspot.com/";

const fileUrl = (file: string, token: string) => {
  return `${host}o/icons%2F${file}.png?alt=media&token=${token}`;
};

const color = {
  category1: "#00A6FF", // 釣り、
  category2: "#F3B042", // 駅、
  category3: "#77D353", // 公園
  category4: "#969FAA", // default
  category5: "#ffc0cb" // 花見
};

export const KINDS: any = {
  [KIND_FISHING]: {
    src: fileUrl("0001", "775aafee-f9f4-4590-acd1-35b9afa36a46"),
    name: "釣り",
    backgroundColor: color.category1
  },
  [KIND_LUNCH]: {
    src: fileUrl("0002", "9b7d8fdf-b640-4519-af1d-3657c025deab"),
    name: "ランチ",
    backgroundColor: color.category2
  },
  [KIND_AMUSEMENT_PARK]: {
    src: fileUrl("0003", "7f7da0ec-625e-448b-8bf0-877c4a13fb3e"),
    name: "遊園地",
    backgroundColor: color.category3
  },
  [KIND_PARK]: {
    src: fileUrl("0004", "3b163ef4-8ee4-47a5-b316-e786c5b9e3d3"),
    name: "公園",
    backgroundColor: color.category3
  },
  [KIND_ART_MUSEUM]: {
    src: fileUrl("0005", "3e75ebc9-3c9a-451b-9419-3e3aed034ec0"),
    name: "美術展",
    backgroundColor: color.category3
  },
  [KIND_HOTEL]: {
    src: fileUrl("0006", "c0b3df18-de7d-4188-b513-51158953202e"),
    name: "ホテル",
    backgroundColor: color.category2
  },
  [KIND_HOME]: {
    src: fileUrl("0007", "e5f96cff-10ce-4578-a37b-f07d066f808b"),
    name: "家",
    backgroundColor: color.category2
  },
  [KIND_AQUARIUM]: {
    src: fileUrl("0008", "b61fc8f7-bded-4127-aa4d-3e2bd6d07aa1"),
    name: "水族館",
    backgroundColor: color.category1
  },
  [KIND_DEFAULT]: {
    src: fileUrl("0009", "1ce7b4c8-6854-44c6-a46d-02f4e2c38913"),
    name: "地球",
    backgroundColor: color.category4
  },
  [KIND_CASTLE]: {
    src: fileUrl("0010", "9d50233b-5a8a-49d8-954e-87efa4debc21"),
    name: "城",
    backgroundColor: color.category2
  },
  [KIND_ZOO]: {
    src: fileUrl("0011", "6d2fc15a-cb38-4269-bbbf-e50cb511cfbc"),
    name: "動物園",
    backgroundColor: color.category2
  },
  [KIND_COFFEE]: {
    src: fileUrl("0012", "4adeffff-5b9f-4333-a675-6b53f641c212"),
    name: "カフェ、喫茶店",
    backgroundColor: color.category2
  },
  [KIND_SHOP]: {
    src: fileUrl("0013", "ce20190f-5b48-4eea-8de4-d659ea7b046b"),
    name: "ショッピング",
    backgroundColor: color.category2
  },
  [KIND_TRAIN]: {
    src: fileUrl("0014", "cf41f413-2715-43b2-9277-0e4dd58b57db"),
    name: "電車",
    backgroundColor: color.category2
  },
  [KIND_MOVIE]: {
    src: fileUrl("0015", "679e26af-80f9-4f01-9bc9-1782b4404250"),
    name: "映画館",
    backgroundColor: color.category3
  },
  [KIND_BEACH]: {
    src: fileUrl("0016", "8e1fcffe-389a-4456-bdcd-0d95117a3f3c"),
    name: "ビーチ",
    backgroundColor: color.category1
  },
  [KIND_CHERRY_BLOSSOM]: {
    src: fileUrl("0017", "5c513b84-ccec-45ee-810f-a7af93b345fc"),
    name: "花見",
    backgroundColor: color.category5
  },
  [KIND_SHIP]: {
    src: fileUrl("0018", "8010aa6f-6db4-4d1b-bbd5-037e9d0e6473"),
    name: "船、水上バス",
    backgroundColor: color.category1
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
