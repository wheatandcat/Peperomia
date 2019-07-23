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
    borderWidth: 1,
    borderColorAlpha: 0.05,
    backgroundColorAlpha: 0.05
  },
  schedule: {
    borderWidth: 1,
    borderColorAlpha: 0.05,
    backgroundColorAlpha: 0.05
  }
};

export default config;
