const express = require('express');
const router = express.Router();
const { SearchVideo, Popular, Category} = require('../controller/controller');
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');

router.use('/api-docs',swaggerUi.serve);
router.use('/api-docs',swaggerUi.setup(swaggerDocument));



router.get('/search',SearchVideo);
router.get('/mostpopular',Popular);
router.get('/category',Category);



module.exports = router;