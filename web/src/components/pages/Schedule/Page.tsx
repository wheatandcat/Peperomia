import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { KIND_PARK } from "../../../lib/getKind";

const data = [
  {
    id: "1",
    title: "新宿駅",
    kind: KIND_PARK,
    moveMinutes: 30
  },
  {
    id: "2",
    title: "葛西臨海公園",
    kind: KIND_PARK,
    moveMinutes: null
  },
  {
    id: "3",
    title: "葛西臨海公園 水上バス",
    kind: KIND_PARK,
    moveMinutes: 120
  },
  {
    id: "4",
    title: "浅草寺二天門前",
    kind: KIND_PARK,
    moveMinutes: null
  }
];

export default () => {
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
      <div>
        {data.map(item => (
          <span key={item.id}>
            <ExpansionPanel style={{ backgroundColor: "#eee" }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>■メモ</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <div style={{ padding: 5, paddingLeft: 25, fontSize: "11px" }}>
              {item.moveMinutes ? item.moveMinutes + "分" : "-"}
            </div>
          </span>
        ))}
      </div>
    </>
  );
};
