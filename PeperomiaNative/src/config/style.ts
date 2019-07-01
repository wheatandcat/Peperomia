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
    borderColorAlpha: 1.0,
    backgroundColorAlpha: 0.1
  },
  schedule: {
    borderWidth: 0.5,
    borderColorAlpha: 0,
    backgroundColorAlpha: 0.1
  }
};

export default config;
