const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')
const router = express.Router();
const {GetFromFavorite,AddToFavorite,RemoveFromFavorite} = require('../Controller/favoriteControllers')

router.use('/api-docs',swaggerUi.serve);
router.use('/api-docs',swaggerUi.setup(swaggerDocument));




router.post('/addToFavorite',AddToFavorite);
router.get('/getFavorite',GetFromFavorite)
router.put('/removeFavorite',RemoveFromFavorite);


module.exports = router;