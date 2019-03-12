import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Item, ItemDetail } from "../../../lib/item";
import Cards from "../../organisms/Schedule/Cards";

interface Props {
  item: Item;
  itemDetails: ItemDetail[];
}

export default (props: Props) => {
  return (
    <>
      <Typography
        gutterBottom
        style={{
          paddingTop: 10,
          paddingBottom: 0,
          paddingLeft: 10,
          fontSize: "1.0rem"
        }}
      >
        {props.item.title}
      </Typography>
      <Divider />
      <Cards {...props} />
    </>
  );
};
