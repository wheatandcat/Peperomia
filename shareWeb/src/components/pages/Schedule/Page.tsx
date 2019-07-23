import React from "react";
import Color from "color";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import { Item, ItemDetail } from "../../../lib/item";
import IconImage from "../../atoms/IconImage";
import Cards from "../../organisms/Schedule/Cards";
import { KINDS } from "../../../lib/getKind";
import s from "../../../config/style";

interface Props {
  item: Item;
  itemDetails: ItemDetail[];
  updating: boolean;
}

export default (props: Props) => {
  const config = KINDS[props.item.kind];
  const ss = s.schedule;

  if (!config) {
    return null;
  }

  return (
    <div style={{ height: "100vh" }}>
      <Snackbar
        open={props.updating}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        ContentProps={{
          "aria-describedby": "snackbar-fab-message-id"
        }}
        message={
          <div style={{ width: "320px" }}>
            <div id="snackbar-fab-message-id">更新中・・・</div>
            <LinearProgress />
          </div>
        }
      />

      <div
        style={{
          display: "flex",
          paddingLeft: "10px",
          paddingTop: "5px",
          paddingBottom: "5px",
          alignItems: "center",
          border: "solid 1px #000",
          backgroundColor: Color(config.backgroundColor)
            .lighten(ss.borderColorAlpha)
            .toString()
        }}
      >
        <div
          style={{
            borderWidth: "1px",
            padding: "5px"
          }}
        >
          <IconImage {...config} size={25} />
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
          height: "80%",
          overflow: "scroll",
          paddingTop: "1rem"
        }}
      >
        <Cards {...props} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "40px",
            backgroundColor: "#232F3E"
          }}
        >
          <div
            style={{
              color: "#fff",
              position: "absolute",
              bottom: 5,
              right: 10
            }}
          >
            <a
              href="https://peperomia.app/"
              rel="noopener noreferrer"
              target="_blank"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              ペペロミア
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
