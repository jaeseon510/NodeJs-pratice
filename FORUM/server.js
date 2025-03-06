const express = require('express')
const app = express()

app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:daUuOVPHABoORffB@cluster0.5evl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('Cluster0')
    app.listen(8080, () =>{
    console.log('http://localhost:8080 에서 서버 실행중')
    })
}).catch((err)=>{
  console.log(err)
})





app.get('/', (요청,응답)=>{
    응답.sendFile(__dirname + '/index.html')
})

app.get('/news', (요청,응답)=>{
    db.collection('post').insertOne({title : '어쩌구'})
    // 응답.send('비옴')
})

app.get('/shop', (요청,응답)=>{
    응답.send('쇼핑페이지임')
})

app.get('/list', async(요청,응답)=>{
    let result = await db.collection('post').find().toArray()
    응답.render('list.ejs', {글목록 : result})
})

app.get('/time',(요청,응답)=>{
    응답.render('time.ejs',{data: new Date()})
})

app.get('/write',(요청,응답)=>{
    응답.render('write.ejs')
})

app.post('/add',async(요청,응답)=>{
    await db.collection('post').insertOne({title : 요청.body.title, content: 요청.body.content})
    console.log(요청.body)
    응답.redirect('/')
})