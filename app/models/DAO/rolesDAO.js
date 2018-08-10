//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getRoles()
{
    const SQL = 
    `SELECT * FROM Roles`;
    
    return await fw.db.execute('local',SQL);
}

module.exports = 
{
    getRoles
}