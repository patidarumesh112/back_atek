// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../controllers/userController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) 
    }
  });
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // limit file size to 2MB
  }).single('image'); // 'image' should match the name attribute of your file input
  
router.post('/createWithArray', userController.createUsersWithArray);
router.get('/:username', userController.getUserByUsername);
router.put('/:id', userController.updateUser);
router.delete('/:username', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/user/logout', userController.logoutUser);
router.put('/uploadImage/:id',upload, userController.imageupload);

module.exports = router;
