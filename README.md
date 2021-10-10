# ログイン認証およびCRUDアプリ

## 使用技術
フロント
nuxt.js
vuetify
サーバサイド
node.js(express)
データベース
mysql

## 制作目的
ログイン・ログアウトを機能を作成を通じて、
基本的なcrud処理（ユーザ情報のデータの管理）
をmysqlとnode.jsを用いてできるようになること。

## データベース設計

users テーブル

+----------+--------------+------+-----+---------+----------------+  
| Field    | Type         | Null | Key | Default | Extra          |  
+----------+--------------+------+-----+---------+----------------+  
| id       | int          | NO   | PRI | NULL    | auto_increment |  
| name     | varchar(255) | NO   |     | NULL    |                |  
| email    | varchar(255) | NO   | UNI | NULL    |                |  
| password | varchar(255) | NO   |     | NULL    |                |  
+----------+--------------+------+-----+---------+----------------+  

## 機能一覧
* ログイン
* ログアウト
* ユーザー登録
* ユーザーのパスワードの更新
* 入力形式のバリデーション

## 苦労したところ
ハッシュ化したパスワードを用いた認証

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
