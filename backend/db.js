const mongoose = require('mongoose')
const MongoURI = "mongodb+srv://prasantrao917:Prasant567@cluster0.njc1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const ConnectToMongo = async() => {
    await mongoose.connect(MongoURI)
    .then(()=>console.log("Connected Successfully"))
    .catch((e)=>console.log(e.message))
}

module.exports = ConnectToMongo;