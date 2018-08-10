//====================
// Dependencies
//====================
const rolesDAO = fw.getDAO('roles');

//====================
// Methods
//====================
async function getRoles()
{
    return await rolesDAO.getRoles();
}

module.exports =
{
    getRoles
}