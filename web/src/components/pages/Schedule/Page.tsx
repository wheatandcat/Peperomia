import React from "react";
import Color from "color";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Item, ItemDetail } from "../../../lib/item";
import IconImage from "../../atoms/IconImage";
import Cards from "../../organisms/Schedule/Cards";
import { KINDS } from "../../../lib/getKind";
import s from "../../../config/style";

interface Props {
  item: Item;
  itemDetails: ItemDetail[];
}

export default (props: Props) => {
  const config = KINDS[props.item.kind];
  const ss = s.schedule;

  if (!config) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          paddingTop: "5px",
          paddingBottom: "5px",
          alignItems: "center",
          border: "solid 1px #000",
          backgroundColor: Color(config.backgroundColor)
            .alpha(ss.borderColorAlpha)
            .toString()
        }}
      >
        <div
          style={{
            borderWidth: "1px",
            padding: "5px"
          }}
        >
          <IconImage kind={props.item.kind} size={25} />
        </div>
        <div style={{ paddingTop: "10px" }}>
          <Typography
            gutterBottom
            style={{
              paddingLeft: 10,
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#777"
            }}
          >
            {props.item.title}
          </Typography>
        </div>
      </div>

      <Divider />
      <div
        style={{
          height: "100%",
          marginBottom: "100px",
          overflow: "scroll",
          paddingTop: "1rem"
        }}
      >
        <Cards {...props} />
      </div>
    </div>
  );
};
