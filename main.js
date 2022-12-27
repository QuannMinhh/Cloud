const { Int32, ObjectId } = require('bson')
var express = require('express')
const { insertNewChampion, viewAllChampions, postEditChampion, deleteChampion, getEditChampion } = require('./databaseHandler')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await deleteChampion(id)
    res.redirect('/view')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const championToEdit = await getEditChampion(id)
    res.render("edit",{champion:championToEdit})
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picUrl = req.body.txtPic
    await postEditChampion(id, name, price, picUrl)
    res.redirect('/view')
})

app.post('/new',async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPic
    let newChampion = {
        name : name,
        price : Number.parseInt(price),
        pictureURL: picture
    }
    await insertNewChampion(newChampion)
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('newChampion')
})

app.get('/view',async (req,res)=>{
    let results = await viewAllChampions()
    res.render('view',{'results':results})
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Welcome to Summoner's Rift")







