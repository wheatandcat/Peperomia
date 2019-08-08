interface Config {
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
