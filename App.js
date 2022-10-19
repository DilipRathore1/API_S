const express = require('express');
let app = express();
let fs = require('fs');
let dotenv = require('dotenv');
dotenv.config()
let cors = require('cors');
let Port = process.env.PORT||5000;
let morgan = require('morgan');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl ="mongodb+srv://dilip:dilip123@cluster0.va3agpe.mongodb.net/carwale?retryWrites=true&w=majority";
let bodyParser = require('body-parser')
let db;

app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    let sort={Price:1}
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    db.collection('allcars').find().sort(sort).toArray((err,result)=>{
        res.send(result)
    })
})

//1 bike lists with category when user click on any 4 category it will show bikes accordingly
app.get('/categories',(req,res)=>{
    db.collection('category').find().toArray((err,result)=>{
    if (err) throw err
    res.send(result)
    })
})
//2 bike wrt to brand ids
app.get('/allcars',(req,res)=>{
    let query={}
    let brand=Number(req.query.brand)
    if(brand){
        query={Brand_id:brand}
    }
    db.collection('allcars').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
// 3 bikes wrt to category
app.get('/catcars',(req,res)=>{
    let query ={}
    let categoryId=Number(req.query.categoryId)
    if(categoryId){
        query={
            category_id:categoryId
        }
    }
    db.collection('allcars').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

// this is for find bike 
app.get('/filter/:brandId',(req,res)=>{
    let query ={};
    let brandId =Number(req.params.brandId);
    let lprice =Number(req.query.lprice);
    let hprice =Number(req.query.hprice);
    let category =(req.query.category)
    
    //this is for cat wrt to price
    if(category && lprice && hprice){
        query={
            Brand_id:brandId,
            category:category,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }
    }
    else if(lprice&&hprice){
        query={
            Brand_id:brandId,
           $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }
    }
    else if(category){
        query={
            category:category
        }
    }


    
    db.collection('allcars').find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
        
    

})


app.get('/filtercat/:categoryId',(req,res)=>{
    let categoryId=Number(req.params.categoryId)
    let brandId=Number(req.query.brandId)
    let lprice=Number(req.query.lprice)
    let hprice=Number(req.query.hprice)
    let sort={Price:1}

    let query={}
    if(req.query.sort){
        sort={Price:req.query.sort}
    }
    if(brandId&&lprice&&hprice){
        query={
            category_id:categoryId,
            Brand_id:brandId,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }

    }
    else if(lprice&&hprice){
        query={
            category_id:categoryId,
            $and:[{Price:{$lt:hprice,$gt:lprice}}]
        }

    }
    else if(brandId){
        query={
            category_id:categoryId,
            Brand_id:brandId

        }
    }
    db.collection('allcars').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
// Details page
app.get('/details/:id',(req,res)=>{
    let id=Number(req.params.id);
    db.collection('allcars').find({id:id}).toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})


// list of orders
app.get('/orders',(req,res)=>{
    let email = req.query.email;
    let query ={};
    if (email){
        query={email}
    }
    db.collection('orders').find(query).toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

// place the order
app.post('/placeOrder',(req,res)=>{
    console.log(req.body);
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Order Placed')
    })
}) 
// Update Order
app.put('/updateOrder/:id',(req,res)=>{
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank":req.body.status,
                "status":req.body.status
        }
        },(err,result)=>{
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})
// Delete Order
app.delete('/deleteOrder/:id',(req,res)=>{
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result)=>{
        if (err) throw err;
        res.send('order Deleted')
    })
})
//connection with mongo
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("error while connecting")
    db=client.db('carwale')
    app.listen(Port,()=>{
        console.log(`server is running at ${Port}`)
    })
})

