const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

//middleWare call
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;



app.get('/', (req,res)=>{
    res.send('server response korce')
})

//database Connection 

const uri = `mongodb+srv://${process.env.GENIUS_USER}:${process.env.GENIUS_PASS}@drn.cozpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){

    try{
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');
    
        app.get('/service', async (req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);

        });

        app.get('/service/:id', async (req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);

        });

        app.post('/service', async (req,res)=>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);

        });

        app.delete('/service/:id', async(req,res)=>{
         const id = req.params.id;
         const query = {_id: ObjectId(id)};
         const result = await serviceCollection.deleteOne(query);
         res.send(result);
            
        });
    }

    finally{

    }
};

run().catch(console.dir)



app.listen(port, ()=>{
    console.log('genius car server Running')
})
