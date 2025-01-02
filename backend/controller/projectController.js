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

const getChartData = async (req, res, next) => {
    try {
        
        const barChartData = [
            { name: "Germany", value: 40632, extra: { code: "de" } },
            { name: "United States", value: 50000, extra: { code: "us" } },
            { name: "France", value: 36745, extra: { code: "fr" } },
            { name: "United Kingdom", value: 36240, extra: { code: "uk" } },
            { name: "Spain", value: 33000, extra: { code: "es" } },
            { name: "Italy", value: 35800, extra: { code: "it" } }
        ];

        const heatmapData = [
            {
                name: "Germany",
                series: [
                    { name: "2010", value: 40632, extra: { code: "de" } },
                    { name: "2000", value: 36953, extra: { code: "de" } },
                    { name: "1990", value: 31476, extra: { code: "de" } }
                ]
            },
            {
                name: "United States",
                series: [
                    { name: "2010", value: 0, extra: { code: "us" } },
                    { name: "2000", value: 45986, extra: { code: "us" } },
                    { name: "1990", value: 37060, extra: { code: "us" } }
                ]
            },
            {
                name: "France",
                series: [
                    { name: "2010", value: 36745, extra: { code: "fr" } },
                    { name: "2000", value: 34774, extra: { code: "fr" } },
                    { name: "1990", value: 29476, extra: { code: "fr" } }
                ]
            },
            {
                name: "United Kingdom",
                series: [
                    { name: "2010", value: 36240, extra: { code: "uk" } },
                    { name: "2000", value: 32543, extra: { code: "uk" } },
                    { name: "1990", value: 26424, extra: { code: "uk" } }
                ]
            }
        ];

       
        return res.json({
            status: 'success',
            data: { barChartData, heatmapData },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred while fetching chart data.',
        });
    }
};


module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
    getChartData,
};
