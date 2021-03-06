# 認証およびCRUDアプリ

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

### users テーブル  
  
| Field    | Type         | Null | Key | Default | Extra          |
| -------- | ------------ | ---- | --- | ------- | -------------- |
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | NO   |     | NULL    |                |
| email    | varchar(255) | NO   | UNI | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |

## 機能一覧
* ログイン・ログアウト(select)
JWTを利用  
* ユーザーの削除(delete)
* ユーザの新規登録(insert)
* ユーザーのパスワードの更新(update)  
* 入力形式のバリデーション（vuetifyの機能）  
* パスワードのハッシュ化（bcryptパッケージ）

## 苦労したところ
ハッシュ化したパスワードを用いた認証  
