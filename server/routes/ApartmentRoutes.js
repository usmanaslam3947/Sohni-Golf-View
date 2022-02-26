const express = require('express');
const router = express.Router();
const apartment = require('../controller/ApartmentController');

router.post('/createApart',apartment.createApartment);
router.get('/apartment',apartment.getApartment);
// router.put('/updateApart',apartment.updateApartment);
// router.put('/deleteApart',apartment.deleteApartment);

module.exports = router
