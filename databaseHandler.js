const { Int32, ObjectId } = require('bson')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://quanminh:1@cluster0.elgh0b6.mongodb.net/?retryWrites=true&w=majority'

async function insertNewChampion(newChampion) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    let newId = await db.collection("champions").insertOne(newChampion)
    return newId
}

async function viewAllChampions() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("champions").find().toArray()
    return results
}

async function postEditChampion(id, name, price, picUrl) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("champions").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "picture": picUrl } })
}

async function deleteChampion(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    await db.collection("champions").deleteOne({ _id: ObjectId(id) })
}

async function getEditChampion(id) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const championToEdit = await db.collection('champions').findOne({ _id: ObjectId(id) })
    return championToEdit
}

module.exports = { insertNewChampion, viewAllChampions, postEditChampion, deleteChampion, getEditChampion }