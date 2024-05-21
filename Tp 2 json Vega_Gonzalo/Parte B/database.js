

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://test:test@cluster0.igj2peq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/paises_db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database, collection;


async function connectToDatabase() {
    try {
        await client.connect();
        database = client.db("paises_db");
        collection = database.collection("paises");
        
    } catch (error) {
        console.error('Error ', error);
    }
}

async function insertData(databaseName, collectionName, data) {
   
}


async function insertPais(pais){
    try {
        const existe = await collection.findOne({ codigo: pais.codigo });

        if (existe) {
            console.log(`El Pais con el codigo ${pais.codigo} ya existe.`);
            return;
        }
        const result  = await collection.insertOne(pais);
        return result
    } catch (error) {
        console.error('Error inserting data:', error);
    }
  
}

async function findData(query) {
    try {
        const result = await collection.find(query).toArray();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function crearIndice(index) {
    try {
        const result = await collection.createIndex(index);
        console.log('Índice creado:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function updateData(filtro, datosNuevos) {
    try {
        const result = await collection.updateOne(filtro, { $set: datosNuevos });
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function deleteData(filter) {
    try {
        const result = await collection.deleteOne(filter);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}




module.exports ={
    connectToDatabase,
    insertPais,
    findData,
    crearIndice,
    updateData,
    deleteData
}
