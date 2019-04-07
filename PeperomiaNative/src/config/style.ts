interface Config {
  text: {
    color: {
      main: string;
    };
  };
  home: {
    borderWidth: number;
    borderColorAlpha: number;
    backgroundColorAlpha: number;
  };
  schedule: {
    borderWidth: number;
    borderColorAlpha: number;
    backgroundColorAlpha: number;
  };
}

const config: Config = {
  text: {
    color: {
      main: "#555"
    }
  },
  home: {
    borderWidth: 0.5,
    borderColorAlpha: 0.5,
    backgroundColorAlpha: 0.5
  },
  schedule: {
    borderWidth: 0.5,
    borderColorAlpha: 0.2,
    backgroundColorAlpha: 0.2
  }
};

export default config;
