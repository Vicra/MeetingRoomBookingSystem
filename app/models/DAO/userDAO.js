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
    `SELECT Users.*, Department.Name as 'Department', Roles.Role FROM Users
    INNER JOIN Roles ON Users.RoleId = Roles.ID
    INNER JOIN Department ON Users.DepartmentId = Department.ID`;
    return await fw.db.execute('local',SQL);
}

async function getUser(id)
{
    const SQL = 
    `SELECT Users.*, Department.Name as 'Department', Roles.Role FROM Users
    INNER JOIN Roles ON Users.RoleId = Roles.ID
    INNER JOIN Department ON Users.DepartmentId = Department.ID
    WHERE Users.ID = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function getUserbyEmail(email)
{
    const SQL = 
    `SELECT * FROM Users
    WHERE UPPER(Email) LIKE ?`;
    return await fw.db.execute('local',SQL,[`%${email.toUpperCase()}%`]);
}

async function addUser(data)
{
    const SQL = 
    `INSERT INTO Users(Name,Salary,StartingDate,Email,Password,DepartmentId,RoleId,Salt)
    VALUES
    (?,?,?,?,?,?,?,?)`;
    return await fw.db.execute('local',SQL,
    [
        data.Name,
        data.Salary, 
        data.StartingDate, 
        data.Email, 
        data.Password,
        data.DepartmentId, 
        data.RoleId,
        data.Salt
    ]);
}

async function updateUser(data)
{
    const SQL = 
    `UPDATE Users
    SET Salary = ?,
    StartingDate = ?,
    Email = ?,
    DepartmentId = ?,
    RoleId = ?
    WHERE ID = ?`;
    return await fw.db.execute('local',SQL,
    [
        data.Salary, 
        data.StartingDate, 
        data.Email, 
        data.DepartmentId, 
        data.RoleId, 
        data.ID
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