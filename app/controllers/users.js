//====================
// Dependencies
//====================
const usersService = fw.getService('user');
const rolesService = fw.getService('roles');
const departmentsService = fw.getService('departments');

//====================
// Methods
//====================
/**
 * Render Main page
 * @param {Object} request
 * @param {Object} h 
 */
function renderMain(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        const users = await usersService.getUsers();
        resolve(h.view('views/users/main', {users, session: request.auth.credentials}));
    });    
}

/**
 * Render View page
 * @param {Object} request
 * @param {Object} h 
 */
function renderView(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        const user = await usersService.getUser(request.query.id);
        
        if(user.length != 1)
        {
            resolve(h.redirect('/users'));
            return;
        }

        resolve(h.view('views/users/view', {user:user[0], session: request.auth.credentials}));
    });
}

/**
 * Render Edit page
 * @param {Object} request
 * @param {Object} h 
 */
function renderEdit(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        const user = await usersService.getUser(request.query.id);
        
        if(user.length != 1)
        {
            resolve(h.redirect('/users'));
            return;
        }

        resolve(h.view('views/users/edit', 
        {
            user:user[0],
            roles: await rolesService.getRoles(),
            departments: await departmentsService.getDepartments(), 
            session: request.auth.credentials
        }));
    });
    
}

/**
 * Render Add page
 * @param {Object} request
 * @param {Object} h 
 */
function renderAdd(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        resolve(h.view('views/users/add', 
        {
            roles: await rolesService.getRoles(),
            departments: await departmentsService.getDepartments(), 
            session: request.auth.credentials
        }));
    });
    
}


function addUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUserbyEmail(request.payload.email);
        if(user.length > 0)
        {
            stResponse.message = "User already exist";
            resolve(stResponse);
            return;
        }


        const salt = fw.utils.getUUID();
        const hashPassword = fw.utils.getMD5(request.payload.password + salt);

        const Params = 
        {
            Name: request.payload.name,
            Password: hashPassword,
            Salt: salt,
            Salary: request.payload.salary, 
            StartingDate: request.payload.startingdate, 
            Email: request.payload.email, 
            DepartmentId: request.payload.departmentid, 
            RoleId: request.payload.roleid
        }
    
        await usersService.addUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUser(request.payload.userid);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.email != user[0].Email)
        {
            const userExist = await usersService.getUserbyEmail(request.payload.email);
            if(userExist.length > 0)
            {
                stResponse.message = "Email account is already linked to another user. Please use another email address.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            Salary: request.payload.salary, 
            StartingDate: request.payload.startingdate, 
            Email: request.payload.email, 
            DepartmentId: request.payload.departmentid, 
            RoleId: request.payload.roleid, 
            ID: request.payload.userid
        }
    
        await usersService.updateUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteUser(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUser(request.payload.userid);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        await usersService.deleteUser(request.payload.userid);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    renderMain,
    renderView,
    renderEdit,
    renderAdd,
    addUser,
    editUser,
    deleteUser
}