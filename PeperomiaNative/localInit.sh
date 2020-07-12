#!/bin/sh

echo "ローカル環境の初期設定をしますか？ yes or no."

read answer

case $answer in
    yes)
        echo "設定を初期化します....\n"
        cp -r .env.template .env.development
        cp -r .env.template .env.product

        cp -r config/template.json config/development.json
        cp -r config/template.json config/product.json

        yarn
        echo "設定が完了しました。developモードで起動します...\n"
        yarn start
        ;;
    no)
        echo "コマンドを中断しました\n"
        ;;
    *)
        echo "コマンドを中断しました\n"
        ;;
esac


