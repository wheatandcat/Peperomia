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
