const Student = require("../models/student.model");
const { Op } = require("sequelize");
const studentService = {
    createStudent: async (data) => {
        return await Student.create(data);
    },

    getStudentByEmail: async (email) => {
        return await Student.findOne({ where: { email } });
    },

    getStudentById: async (id) => {
        return await Student.findByPk(id);
    },



    updateStudent: async (id, dataToUpdate) => {
        const student = await Student.findByPk(id);
        if (!student) return null;
        return await student.update(dataToUpdate);
    },

    deleteStudent: async (id) => {
        return await Student.destroy({ where: { id } });
    },

    // Get all students with pagination & search
    getStudentList: async ({ page = 1, limit = 10, searchString = "" }) => {
        const offset = (page - 1) * limit;

        const condition = searchString
            ? {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${searchString}%` } },
                    { last_name: { [Op.iLike]: `%${searchString}%` } },
                    { email: { [Op.iLike]: `%${searchString}%` } },
                    { rollno: { [Op.iLike]: `%${searchString}%` } }
                ]
            }
            : {};

        return await Student.findAndCountAll({
            where: condition,
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });
    }

};

module.exports = studentService;
