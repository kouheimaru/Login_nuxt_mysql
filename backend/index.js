const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
//json受け取る方式で利用する
app.use(bodyParser.json());

const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_db'
})

// 接続の確認
// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected');
// });

// const insert = 'INSERT INTO USERS (name, email, password) value (?,?,?)'
// //ハッシュ化させてデータを挿入する
// bcrypt.hash("password", saltRounds, (err, hash) => {
// //SQL文の実行
//   con.query(insert,["johndoe","john@example.com",hash],function(err, result, fields){
//     if (err) throw err;
//     //結果をログで表示する
//     console.log(result);
//   })
// })

//ユーザー登録
app.post('/api/auth/register/', (req, res) => {
  console.log("登録を開始する")
  //メールが使用済みの場合に挿入できないようにする
  //メールをユニークな値としてテーブル作成する
  const insert = 'INSERT INTO USERS (name, email, password) VALUES (?,?,?)'
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    con.query(insert,[req.body.name,req.body.email,hash],function(err, result, fields){
      if (err) throw err;
      //結果をログで表示する
      // console.log(hash)

      console.log("ユーザーの作成")
      res.json({
        "message": "create User successfully",
        "data": [req.body.name, req.body.email]
      })
  })
  })
})

//ユーザー認証
app.post('/api/auth/login/',(req,res) => {
  console.log("実行")
  const sql = 'select * from users where email = ?'
  const params = req.body.email
  // console.log(req.body.email)
  con.query(sql,req.body.email,(err,user) => {
    if (err) {
      // return res.status(400).json({"error":err.message});
      throw err
    }
    if(!user){
      //  return res.json({"message": "email not found"})
      throw err
    }
    // ハッシュかされたパスワード
    // console.log(user.password)
    // user[0].passwordにしたらできる
    // userはそのままでつかわないでjson型にする
    // json型にする
    const string = JSON.stringify(user)
    const json_data = JSON.parse(string)
    console.log("取得したデータ")
    console.log("json化")
    console.log(json_data)
    console.log("取得したパスワード")
    console.log(json_data[0].password)

    bcrypt.compare(req.body.password, json_data[0].password,(err,result) => {
      console.log("検知しています")
      //未定義である
      // console.log(user.password)
      if(err){
        // console.log("エラー")
        // return res.status(400).json({"error":err.message});
        throw err
      }
      if (!result) {
        // console.log("パスワードが一致してない")
        // return res.json({"message" : "password is not correct"})
        throw err
      }
      // return res.json({"message" : "password is correct"})
      console.log("ログイン成功")
      const payload = {
        id: json_data[0].id,
        name: json_data[0].name,
        email: json_data[0].email
      }
console.log("tokenあげます")
const token = jwt.sign(payload,'secret')
return res.json({token})
    })
  })
})

app.get('/api/auth/user/',(req,res) => {
  const headers = req.headers
  //ここがtokenがないからundefineである
  const bearToken = req.headers['authorization']
  const bearer = bearToken.split(' ')
  const token = bearer[1]
  // return console.log(headers)

  jwt.verify(token,'secret',(err,user)=>{
    if(err){
      return res.sendStatus(403)
    }else{
      return res.json({
            user
          });
    }
  })
});

//一覧の取得
app.get("/api/users", (req, res, next) => {
  const sql = "select * from users"
  const params = []
  con.query(sql, function (err, result, fields) {
    if(err) throw err;
    // console.log(result)
    // res.send('success')
    return res.json({
      "message":"success",
      "data":result  
    })
  })
  // db.all(sql, params, (err, rows) => {
  //     if (err) {
  //       return res.status(400).json({"error":err.message})
  //     }
  //     return res.json({
  //         "message":"success",
  //         "data":rows
  //     })
  //   });
});

// app.get('/',(request, response) => response.send('hello'))

// アカウント削除(delete from users where email = ?)
app.post('/api/delete', (req,res)=>{
  console.log("api通信をする")
  const sql = "delete from users where email = ?";
  console.log(req.body)
  con.query(sql,req.body.email,function(err,result){
    if(err) throw err;
    console.log(result)
    console.log("削除に成功しました")
    //return 処理をする　responseを返す
    return res.json({
      "message":"success",
      "data":result  
    })
  })
})
// パスワードの更新(update users set password = ?  where email = ?)
app.post('/api/update',(req,res)=>{
  console.log("実行")
  console.log(req.body)
  console.log(req.body.email)
  const sql = "update users set password = ? where email = ?"
  console.log(sql)
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    con.query(sql,[hash,req.body.email],function(err, result, fields){
      if (err) throw err;
      //結果をログで表示する
      // console.log(hash)
      console.log("ユーザーのパスワード更新成功")
      //return で値を返す responbseを返す
      return res.json({
        "message":"success",
        "data":result  
      })
  })
  })
})

app.listen(port, () => console.log(`example app listening on port ${port}!`))