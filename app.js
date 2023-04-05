const express=require("express");
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));

const cors=require('cors');
app.use(cors());
const sequelize=require('./util/database');

const productRoutes=require('./routes/product');
app.use('/product',productRoutes);

sequelize.sync()
        .then(result=>{
            app.listen(3000);
        })
        .catch(err=>{
            console.log(err);
        })