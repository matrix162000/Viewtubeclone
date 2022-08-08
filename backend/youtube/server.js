const express=require("express");
const axios = require('axios');
const app= express();
const port = 5000;
const apiKey = "AIzaSyC7sWeL1tIQ4ttR05-GiDKAL_OViIpN5M4";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const cors=require('cors');
const logger = require('morgan')

app.use(logger('dev'))

app.use(cors());

app.use('/api-docs',swaggerUi.serve);
app.get('/api-docs',swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use('/api',apiRoutes);



module.exports=app.listen(port ,()=>{
    console.log("server is running on port 5000");
});

