//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getUsers()
{
    const SQL = 
    `SELECT Users.*, Roles.name as role FROM Users
    INNER JOIN Roles ON Users.role_id = Roles.id`;
    return await fw.db.execute('local',SQL);
}

async function getUser(id)
{
    const SQL = 
    `SELECT Users.*, Roles.name as role FROM Users
    INNER JOIN Roles ON Users.role_id = Roles.id
    WHERE Users.id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function getUserbyEmail(email)
{
    const SQL = 
    `SELECT * FROM Users
    WHERE UPPER(Email) = ?`;
    return await fw.db.execute('local',SQL,[`${email.toUpperCase()}`]);
}

async function addUser(data)
{
    const SQL = 
    `INSERT INTO Users(name,email,password,role_id,salt)
    VALUES
    (?,?,?,?,?)`;
    return await fw.db.execute('local',SQL,
    [
        data.name,
        data.email, 
        data.password,
        data.roleid,
        data.salt
    ]);
}

async function updateUser(data)
{
    console.log(data);
    const SQL = 
    `UPDATE Users
    SET email = ?,
    role_id = ?
    WHERE id = ?`;
    return await fw.db.execute('local',SQL,
    [
        data.email, 
        data.roleid,
        data.id
    ]);
}

async function deleteUser(id)
{
    const SQL = 
    `DELETE FROM Users
    WHERE ID = ?`;
    return await fw.db.execute('local',SQL,[id]);
}


module.exports = 
{
    getUserbyEmail,
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}