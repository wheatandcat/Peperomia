import React from "react";
import { storiesOf } from "@storybook/react-native";
import TimeDialog from "./TimeDialog";
import Memo from "./Memo";

storiesOf("organisms/CreateScheduleDetail", module)
  .add("TimeDialog", () => (
    <TimeDialog
      open
      onChange={() => null}
      onSetManualTime={() => null}
      onCloseManualTime={() => null}
    />
  ))
  .add("Memo", () => <Memo place="" url="" memo="" />);
