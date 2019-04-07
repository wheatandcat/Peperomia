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
  category1: "#00A6FF", // 海系
  category2: "#F3B042", // 駅、移動
  category3: "#77D353", // 公園
  category4: "#969FAA", // default
  category5: "#ffc0cb", // 花見
  category6: "#dc143c", //　芸術、映画
  category7: "#ffff00", // 動物園
  category8: "#add8e6", // カフェ,
  category9: "#adff2f" // ショッピング
};

export const KINDS: any = {
  [KIND_FISHING]: {
    src: fileUrl("0001", "c2e5e991-3fd8-4b19-b7c8-d0a8a4969c0f"),
    name: "釣り",
    backgroundColor: color.category1
  },
  [KIND_LUNCH]: {
    src: fileUrl("0002", "22dd5c4c-e900-4c65-a309-1295d29bc983"),
    name: "ランチ",
    backgroundColor: color.category2
  },
  [KIND_AMUSEMENT_PARK]: {
    src: fileUrl("0003", "0b1ee231-3579-4b5a-8b85-849affb9e99d"),
    name: "遊園地",
    backgroundColor: color.category3
  },
  [KIND_PARK]: {
    src: fileUrl("0004", "22b78553-dca2-46b8-849e-5ad64d8d67bf"),
    name: "公園",
    backgroundColor: color.category3
  },
  [KIND_ART_MUSEUM]: {
    src: fileUrl("0005", "10d0b783-e724-4a9a-9843-e560463d26ff"),
    name: "美術展",
    backgroundColor: color.category6
  },
  [KIND_HOTEL]: {
    src: fileUrl("0006", "787af466-7a6e-4715-adab-af49a236e21a"),
    name: "ホテル",
    backgroundColor: color.category2
  },
  [KIND_HOME]: {
    src: fileUrl("0007", "6f4a216b-2658-4fc6-bdfb-db362ed96019"),
    name: "家",
    backgroundColor: color.category2
  },
  [KIND_AQUARIUM]: {
    src: fileUrl("0008", "8681dc84-ad52-4c52-a8a9-8dc7ef33ec4a"),
    name: "水族館",
    backgroundColor: color.category1
  },
  [KIND_DEFAULT]: {
    src: fileUrl("0009", "96d2a212-3dc8-46d7-9b75-8e6df25445a0"),
    name: "地球",
    backgroundColor: color.category4
  },
  [KIND_CASTLE]: {
    src: fileUrl("0010", "3e4b9a38-685f-4219-a9f2-817fe9b26ce2"),
    name: "城",
    backgroundColor: color.category2
  },
  [KIND_ZOO]: {
    src: fileUrl("0011", "6d2fc15a-cb38-4269-bbbf-e50cb511cfbc"),
    name: "動物園",
    backgroundColor: color.category7
  },
  [KIND_COFFEE]: {
    src: fileUrl("0012", "a48b12a1-4519-4e3c-a00d-af84f58c73e0"),
    name: "カフェ、喫茶店",
    backgroundColor: color.category8
  },
  [KIND_SHOP]: {
    src: fileUrl("0013", "9ef522f4-3ec7-4b36-9626-f57a7ef56d8b"),
    name: "ショッピング",
    backgroundColor: color.category9
  },
  [KIND_TRAIN]: {
    src: fileUrl("0014", "cad16021-a062-4e93-85bf-9c4be19bcf7a"),
    name: "電車",
    backgroundColor: color.category2
  },
  [KIND_MOVIE]: {
    src: fileUrl("0015", "679e26af-80f9-4f01-9bc9-1782b4404250"),
    name: "映画館",
    backgroundColor: color.category6
  },
  [KIND_BEACH]: {
    src: fileUrl("0016", "5a597dcd-dac7-4f49-a35e-6f8d978a7a4c"),
    name: "ビーチ",
    backgroundColor: color.category1
  },
  [KIND_CHERRY_BLOSSOM]: {
    src: fileUrl("0017", "1cd0dc64-4d0c-4d63-ac6e-c01d2014b2fa"),
    name: "花見",
    backgroundColor: color.category5
  },
  [KIND_SHIP]: {
    src: fileUrl("0018", "0f52edae-d5bc-4f90-85ac-3d468e82d599"),
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
