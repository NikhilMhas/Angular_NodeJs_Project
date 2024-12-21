const { authentication, restrictTo } = require("../controller/authController");
const { createProject, getAllProject, getProjectById, updateProject, deleteProject } = require("../controller/projectController");

const router = require("express").Router();
router.post("/" ,createProject);
router.get("/",getAllProject);  
router.get('/:id', getProjectById);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports=router;