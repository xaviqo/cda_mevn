const express = require('express');
const router = express.Router();
const actorService = require('../service/actor.service');
const Actor = require('../models/Actor');
const loginService = require('../service/login.service');
const Admin = require('../models/Admin');
const verifyToken = require('../middlewares/auth.jwt')

// LOGIN
router.post('/admin/login', loginService.logIn);
router.get('/admin/check',verifyToken,(req,res) =>
    res.status(200).json({admin:true})
);
//router.post('/create-admin', loginService.createAdmin);


router.get('/gallery', actorService.gallery);
router.post('/new',verifyToken,actorService.create);
router.delete('/delete/:id',verifyToken,actorService.delete);
router.post('/update/:id',verifyToken,actorService.update);
router.post('/upload/photos/:id/:title',actorService.upload ,actorService.uploadImage);
router.post('/change-status/:id',verifyToken,actorService.changeStatus);
router.post('/images/main/:id/:imageId',actorService.changeMainImage);
router.delete('/images/delete/:id/:imageId',actorService.removeImage);
router.get('/experience/retrieve/:id',verifyToken,actorService.retrieveExperiences);
router.get('/profile/retrieve/:id',verifyToken,actorService.retrieveProfile);
router.get('/social/retrieve/:id',verifyToken,actorService.retrieveSocial);
router.get('/images/retrieve/:id',verifyToken, actorService.retrieveImages);
router.get('/videos/retrieve/:id',verifyToken, actorService.retrieveVideos);

module.exports = router;