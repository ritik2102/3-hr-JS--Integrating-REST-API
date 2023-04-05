const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    category:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports=Product;