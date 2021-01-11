module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'テストを作成する「ディレクトリ名」を指定してください。',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { component_name } = answers;
      const path = `pages/${component_name}`;
      const absPath = `src/components/${path}`;
      return { ...answers, path, absPath };
    });
  },
};
