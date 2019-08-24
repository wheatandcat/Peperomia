import React from "react";
import Color from "color";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import styled from "styled-components";
import { IconImage } from "primitive";
import { Item, ItemDetail } from "../../../lib/item";
import { KINDS } from "../../../lib/getKind";
import s from "../../../config/style";
import Cards from "../../organisms/Schedule/Cards";

interface Props {
  item: Item;
  itemDetails: ItemDetail[];
  updating: boolean;
}

function ElevationScroll(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default (props: Props) => {
  const config = KINDS[props.item.kind];
  const ss = s.schedule;

  if (!config) {
    return null;
  }

  return (
    <>
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

        <CssBaseline />

        <ElevationScroll {...props}>
          <AppBar
            style={{
              backgroundColor: Color(config.backgroundColor)
                .lighten(ss.borderColorAlpha)
                .toString(),
              borderBottom: `solid 1px ${Color(config.backgroundColor)
                .darken(0.5)
                .toString()}`
            }}
          >
            <Toolbar>
              <TitleImageContainer>
                <IconImage
                  src={config.src}
                  name={config.name}
                  opacity={1.0}
                  size={30}
                />
              </TitleImageContainer>
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
            </Toolbar>
          </AppBar>
        </ElevationScroll>

        <Toolbar />

        <div>
          <div
            style={{
              height: "80%",
              paddingTop: "1rem"
            }}
          >
            <Cards {...props} />
          </div>
        </div>
      </div>

      <FooterContainer>
        <FooterTitle>
          <a
            href="https://peperomia.app/"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            ペペロミア
          </a>
        </FooterTitle>
      </FooterContainer>
    </>
  );
};

const TitleImageContainer = styled.div`
  padding: 5px;
`;

const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #232f3e;
`;

const FooterTitle = styled.div`
  color: #fff;
  position: absolute;
  bottom: 5px;
  right: 10px;
`;
