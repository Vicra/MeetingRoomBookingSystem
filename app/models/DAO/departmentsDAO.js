//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getDepartments()
{
    const SQL = 
    `SELECT * FROM Department`;
    
    return await fw.db.execute('local',SQL);
}

module.exports = 
{
    getDepartments
}