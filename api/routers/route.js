const express= require('express')
const router=express.Router()

const {createTask,updateTask,deleteTask,AllTask,viewTask}=require('../controllers/controller')

router.route('/create-task').post(createTask)
router.route('/update-task').post(updateTask)
router.route('/delete-task/:taskId').post(deleteTask)
router.route('/view-task/:taskId').get(viewTask)
router.route('/view-all-tasks').get(AllTask)

module.exports=router

