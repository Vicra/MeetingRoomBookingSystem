//====================
// Dependencies
//====================
const userDAO = fw.getDAO('user');

//====================
// Methods
//====================
async function validLogin(email, password)
{
    let Account = await userDAO.getUserbyEmail(email);
    
    if(Account.length > 0)
    {        
        Account = Account[0];
        if(fw.utils.getMD5(password+Account.Salt) == Account.Password)
            return Account;
    }
        
    return false;
}

async function getUsers()
{
    return await userDAO.getUsers();
}

async function getUserbyEmail(email)
{
    return await userDAO.getUserbyEmail(email);
}

async function getUser(id)
{
    return await userDAO.getUser(id);
}

async function addUser(data)
{
    return await userDAO.addUser(data);
}

async function updateUser(data)
{
    return await userDAO.updateUser(data);
}

async function deleteUser(data)
{
    return await userDAO.deleteUser(data);
}



module.exports = 
{
    validLogin,
    getUsers,
    getUser,
    getUserbyEmail,
    addUser,
    updateUser,
    deleteUser
}