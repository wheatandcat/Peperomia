cp -r .env.template .env.development
cp -r config/template.json config/development.json

cd ../primitive && yarn && yarn build

yarn
yarn start
