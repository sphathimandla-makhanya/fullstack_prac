import express from "express";
import controller from '../controller/friends.js'
const router = express.Router()

router
    .route('/')
        //got all friends
        .get(controller.getMany)
        //added friends
        .post(controller.postMany)

router
    .route('/:name')
        //get individual
        .get(controller.getSingle)

        //delete
        .delete(controller.deleteSingle)

        // update
        .patch(controller.updatedb)
      

// router
//     .route('/users')
//         .post(controller.newUser)
export default router