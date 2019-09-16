import theme from "../config/theme";
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
export const KIND_HOT_SPRINGS = "hot_springs";
export const KIND_FIREWORKS = "fireworks";
export const KIND_MOUNTAIN = "mountain";
export const KIND_CAR = "car";
export const KIND_BAND = "band";

const host =
  "https://firebasestorage.googleapis.com/v0/b/peperomia-196da.appspot.com/";

const fileUrl = (file: string, token: string) => {
  return `${host}o/v2%2F${file}.png?alt=media&token=${token}`;
};

const reverFileUrl = (file: string, token: string) => {
  return `${host}o/v2%2Fdark%2F${file}.png?alt=media&token=${token}`;
};

const color = {
  category01: theme.color.lightBlue,
  category02: theme.color.lightRed,
  category03: theme.color.lightYellow,
  category04: theme.color.lightEmerald,
  category05: theme.color.lightOrange,
  category06: theme.color.beige,
  category07: theme.color.pink,
  category08: theme.color.lightNavy,
  category09: theme.color.didgerBlue,
  category10: theme.color.lightGray
};

type Kinds = {
  [key: string]: {
    src: string;
    reversal: {
      src: string;
    };
    name: string;
    backgroundColor: string;
  };
};

export const KINDS: Kinds = {
  [KIND_FISHING]: {
    src: fileUrl("0001", "caaccd36-728e-4f5d-8421-c0360b186550"),
    reversal: {
      src: reverFileUrl("0001", "cc7473e8-d1fa-44fb-ba8e-f087e5529319")
    },
    name: "釣り",
    backgroundColor: color.category01
  },
  [KIND_LUNCH]: {
    src: fileUrl("0002", "be5ea8b1-2357-4a93-bb43-a8b074e1c000"),
    reversal: {
      src: reverFileUrl("0002", "71add4db-9e3a-4d1b-9f7a-bde0ab793cb0")
    },
    name: "ランチ",
    backgroundColor: color.category03
  },
  [KIND_AMUSEMENT_PARK]: {
    src: fileUrl("0003", "687ee438-b638-4032-9a97-d1611ba935bc"),
    reversal: {
      src: reverFileUrl("0003", "cf22ac34-13dd-448c-8999-6db623cdbd8f")
    },
    name: "遊園地",
    backgroundColor: color.category09
  },
  [KIND_PARK]: {
    src: fileUrl("0004", "89ee94a2-17c4-472d-892d-3b1c1cca8438"),
    reversal: {
      src: reverFileUrl("0004", "7c98f1fc-1eec-423e-9796-b9b8cfb29bc6")
    },
    name: "公園",
    backgroundColor: color.category04
  },
  [KIND_ART_MUSEUM]: {
    src: fileUrl("0005", "59e5c10c-06f2-4995-bf59-32fd3a8c002d"),
    reversal: {
      src: reverFileUrl("0005", "4dcd189e-2b39-43f6-815b-013240d815ad")
    },
    name: "美術展",
    backgroundColor: color.category02
  },
  [KIND_HOTEL]: {
    src: fileUrl("0006", "6746018b-0f5f-4923-92a8-8248af243121"),
    reversal: {
      src: reverFileUrl("0006", "cee6240d-c477-4879-8d3f-1d6f66b44dfc")
    },
    name: "ホテル",
    backgroundColor: color.category05
  },
  [KIND_HOME]: {
    src: fileUrl("0007", "534250fe-5a40-4c20-a034-1677233547c4"),
    reversal: {
      src: reverFileUrl("0007", "3bd9b1ef-87e6-4054-839d-3044dcacdd89")
    },
    name: "家",
    backgroundColor: color.category05
  },
  [KIND_AQUARIUM]: {
    src: fileUrl("0008", "b3bd961e-0ab8-4823-844d-a0e47859680e"),
    reversal: {
      src: reverFileUrl("0008", "1e8b7e71-0147-41cf-ad26-b609bfd3b0d5")
    },
    name: "水族館",
    backgroundColor: color.category01
  },
  [KIND_CASTLE]: {
    src: fileUrl("0010", "300f8d01-8c5f-4734-9c31-03c5d8e2018d"),
    reversal: {
      src: reverFileUrl("0010", "4883ceac-bcd0-4791-bf68-f6738057a228")
    },
    name: "城",
    backgroundColor: color.category02
  },
  [KIND_ZOO]: {
    src: fileUrl("0011", "0b65992b-a72b-49b9-a8a5-b6dfb621a6ed"),
    reversal: {
      src: reverFileUrl("0011", "66b745fc-22ca-4846-a0b9-76e0068d4eef")
    },
    name: "動物園",
    backgroundColor: color.category03
  },
  [KIND_COFFEE]: {
    src: fileUrl("0012", "1d1debb6-eefc-468d-9475-e15e8b45460d"),
    reversal: {
      src: reverFileUrl("0012", "59c0a3d0-d2b0-4c09-9fad-ae8d098be06d")
    },
    name: "カフェ、喫茶店",
    backgroundColor: color.category03
  },
  [KIND_SHOP]: {
    src: fileUrl("0013", "ecd96395-bc43-4432-81bf-aecdb50e8099"),
    reversal: {
      src: reverFileUrl("0013", "2349979f-0936-4ffa-a222-44b676935cf5")
    },
    name: "ショッピング",
    backgroundColor: color.category08
  },
  [KIND_TRAIN]: {
    src: fileUrl("0014", "c7cbd7a1-1f25-4726-b1b6-f70d7155b0ec"),
    reversal: {
      src: reverFileUrl("0014", "2f25ccc1-da81-48c9-95be-928719b87f08")
    },
    name: "電車",
    backgroundColor: color.category06
  },
  [KIND_MOVIE]: {
    src: fileUrl("0015", "619bff7a-445c-48cf-9b71-60a5776a6a04"),
    reversal: {
      src: reverFileUrl("0015", "bc4d5de7-5c5e-4ef5-a791-8acc665f2d2c")
    },
    name: "映画館",
    backgroundColor: color.category02
  },
  [KIND_BEACH]: {
    src: fileUrl("0016", "3378834a-74b2-449e-82e8-e428a465e3f9"),
    reversal: {
      src: reverFileUrl("0016", "979b0f13-e689-4c16-ae30-929e70055c2d")
    },
    name: "ビーチ",
    backgroundColor: color.category01
  },
  [KIND_CHERRY_BLOSSOM]: {
    src: fileUrl("0017", "ead57ddc-bee1-487e-b3a1-b6fb8200d5d2"),
    reversal: {
      src: reverFileUrl("0017", "27cc330f-4918-4961-9c22-08ce53f12a4e")
    },
    name: "花見",
    backgroundColor: color.category07
  },
  [KIND_SHIP]: {
    src: fileUrl("0018", "98688d55-3c9b-40b8-bf74-909c484af885"),
    reversal: {
      src: reverFileUrl("0018", "34eb7524-750b-4761-bb05-5c0cdc96a503")
    },
    name: "船、水上バス",
    backgroundColor: color.category01
  },
  [KIND_HOT_SPRINGS]: {
    src: fileUrl("0019", "529c5808-87fd-4cf7-a2b6-8b9132260a6b"),
    reversal: {
      src: reverFileUrl("0019", "b6233f70-6f32-47f3-bd72-1148bd9d51da")
    },
    name: "温泉",
    backgroundColor: color.category09
  },
  [KIND_FIREWORKS]: {
    src: fileUrl("0020", "24806eb9-3c54-4040-b40c-3a77dfed945d"),
    reversal: {
      src: reverFileUrl("0020", "cadfbc62-b736-43b0-864d-74c41fe532dd")
    },
    name: "花火",
    backgroundColor: color.category07
  },
  [KIND_MOUNTAIN]: {
    src: fileUrl("0021", "af4f29ec-c79b-4711-8ad8-2da54c5656ff"),
    reversal: {
      src: reverFileUrl("0021", "53346e7e-2a0d-432b-986f-3b8aefd44c1e")
    },
    name: "山",
    backgroundColor: color.category04
  },
  [KIND_CAR]: {
    src: fileUrl("0022", "2de8d78b-b6ab-4d31-9fae-43bb4d17697c"),
    reversal: {
      src: reverFileUrl("0022", "74833119-61d5-469b-9990-ae6d3c8b3e72")
    },
    name: "車",
    backgroundColor: color.category06
  },
  [KIND_BAND]: {
    src: fileUrl("0023", "00a3bcd6-a980-499b-9dae-bed39df6f9de"),
    reversal: {
      src: reverFileUrl("0023", "35436d65-1ee6-4def-b56d-9d6e1d9c1346")
    },
    name: "バンド",
    backgroundColor: color.category07
  },
  [KIND_DEFAULT]: {
    src: fileUrl("0009", "f4d1665a-9671-41fc-b751-0ec7882ee3e0"),
    reversal: {
      src: reverFileUrl("0009", "22dfc4b7-bb66-4b5f-9e4a-b72ab3faae6e")
    },
    name: "地球",
    backgroundColor: color.category10
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
