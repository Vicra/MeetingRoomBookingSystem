//====================
// Dependencies
//====================
const departmentsDAO = fw.getDAO('departments');

//====================
// Methods
//====================
async function getDepartments()
{
    return await departmentsDAO.getDepartments();
}

module.exports =
{
    getDepartments
}