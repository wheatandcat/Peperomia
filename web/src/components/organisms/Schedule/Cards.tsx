import React from "react";
import { ItemDetail } from "../../../lib/item";
import Card from "../../molecules/Schedule/Card";

interface Props {
  itemDetails: ItemDetail[];
}

export default (props: Props) => {
  return (
    <>
      {props.itemDetails.map(itemDetail => (
        <span key={itemDetail.id}>
          <Card {...itemDetail} />
        </span>
      ))}
    </>
  );
};
