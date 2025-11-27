const project = require('../Model/Project');

const addproject = async (req, res) => {
    try {
        const { studentId, projectname, dos } = req.body;

        const projectd = new project({
            projectname,
            dos,
            studentdetails: studentId
        });

        await projectd.save();
        res.status(200).json({ message: 'Project added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getprojectp = async (req, res) => {
    try {
        const { studentId } = req.params;

        const pdetails = await project
            .find({ studentdetails: studentId })
            .populate('studentdetails');

        res.status(200).json(pdetails);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const projectall = async (req, res) => {
    try {
        const details = await project
            .find()
            .populate('studentdetails', 'name course rollno');

        res.status(200).json(details);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addproject, getprojectp, projectall };
