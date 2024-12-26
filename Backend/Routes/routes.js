const { Router } = require("express");

const upload = require("../controller/controller");
const {postUser, getUserbyId, getUser, deleteUser} = require('../controller/userController')

const router = Router()

router.get('/book/category',upload.getBookCategory)
router.get('/book',upload.getBookData)
router.get('/book/:id',upload.getBookDataById)
router.delete('/book/:id',upload.deleteBookData)
router.post('/book',upload.upload.single('file'),upload.postBook)
router.patch('/book/:id',upload.upload.single('file'),upload.updateBookData)

//! user_router

router.post('/user',postUser)
router.get('/user/:email',getUserbyId)
router.get('/user',getUser)
router.delete('/user/:id', deleteUser)


module.exports = router;