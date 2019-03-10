import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { KIND_PARK } from "../../../lib/getKind";
import { ItemDetail } from "../../../lib/item";
import Cards from "../../organisms/Schedule/Cards";

interface Props {
  itemDetails: ItemDetail[];
}

const data = [
  {
    id: 1,
    itemId: 1,
    title: "新宿駅",
    kind: KIND_PARK,
    memo: "",
    moveMinutes: 30,
    priority: 1
  },
  {
    id: 2,
    itemId: 1,
    title: "葛西臨海公園",
    kind: KIND_PARK,
    memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園",
    moveMinutes: null,
    priority: 2
  },
  {
    id: 3,
    itemId: 1,
    title: "葛西臨海公園 水上バス",
    kind: KIND_PARK,
    memo: "",
    moveMinutes: 120,
    priority: 3
  },
  {
    id: 4,
    itemId: 1,
    title: "浅草寺二天門前",
    kind: KIND_PARK,
    memo: "",
    moveMinutes: null,
    priority: 4
  }
];

export default () => {
  const props: Props = {
    itemDetails: data
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        style={{ paddingTop: 10, paddingBottom: 0, paddingLeft: 10 }}
      >
        葛西臨海公園
      </Typography>
      <Divider />
      <Cards {...props} />
    </>
  );
};
