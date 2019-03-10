import React from "react";
import Color from "color";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ItemDetail } from "../../../lib/item";
import IconImage from "../../atoms/IconImage";
import { KINDS } from "../../../lib/getKind";
import s from "../../../config/style";

export default (props: ItemDetail) => {
  const config = KINDS[props.kind];
  const ss = s.schedule;

  if (!config) {
    console.log("error");
    return null;
  }

  return (
    <>
      <ExpansionPanel
        style={{
          borderRadius: 0,
          borderWidth: ss.borderWidth,
          borderColor: Color(config.backgroundColor)
            .alpha(ss.backgroundColorAlpha)
            .toString(),
          backgroundColor: Color(config.backgroundColor)
            .alpha(ss.borderColorAlpha)
            .toString()
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.title}</Typography>
          <div
            style={{ position: "absolute", top: 0, right: 10, opacity: 0.5 }}
          >
            <IconImage kind={props.kind} size={50} />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {props.memo.split("\n").map(m => (
              <span>
                {m}
                <br />
              </span>
            ))}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div style={{ padding: 5, paddingLeft: 25, fontSize: "11px" }}>
        {props.moveMinutes ? props.moveMinutes + "分" : "-"}
      </div>
    </>
  );
};
