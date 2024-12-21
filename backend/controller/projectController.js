const project = require('../db/models/project');
const user = require('../db/models/user');

const createProject = async (req, res, next) => {
    try {
        const body = req.body;
        //const userId = req.user.id;
        const newProject = await project.create({
            title: body.title,
            productImage: body.productImage,
            price: body.price,
            shortDescription: body.shortDescription,
            description: body.description,
            productUrl: body.productUrl,
            category: body.category,
            tags: body.tags,
            // createdBy: userId,
        });

        return res.status(201).json({
            status: 'success',
            data: newProject,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


/*const getAllProject = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await project.findAll({
            include: user,
            where: { createdBy: userId },
        });

        return res.json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
        });
    }
};
*/

const getAllProject = async (req, res, next) => {
    try {
        const result = await project.findAll({
            include: user, // Include user details if needed
        });

        return res.json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
        });
    }
};


const getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const result = await project.findByPk(projectId, { include: user });

        if (!result) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid project id',
            });
        }

        return res.json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
        });
    }
};

const updateProject = async (req, res, next) => {
    try {
       // const userId = req.user.id;
        const projectId = req.params.id;
        const body = req.body;

        const result = await project.findOne({
            //where: { id: projectId, createdBy: userId },
            where: { id: projectId },
        });

        if (!result) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid project id',
            });
        }

        result.title = body.title;
        result.productImage = body.productImage;
        result.price = body.price;
        result.shortDescription = body.shortDescription;
        result.description = body.description;
        result.productUrl = body.productUrl;
        result.category = body.category;
        result.tags = body.tags;

        const updatedResult = await result.save();

        return res.json({
            status: 'success',
            data: updatedResult,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
        });
    }
};

const deleteProject = async (req, res, next) => {
    try {
       // const userId = req.user.id;
        const projectId = req.params.id;
        const body = req.body;

        const result = await project.findOne({
            //where: { id: projectId, createdBy: userId },
            where: { id: projectId},
        });

        if (!result) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid project id',
            });
        }

        await result.destroy();

        return res.json({
            status: 'success',
            message: 'Record deleted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred',
        });
    }
};

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
};