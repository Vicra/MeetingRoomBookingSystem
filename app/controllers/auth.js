//====================
// Dependencies
//====================
const userService = fw.getService('user');

//====================
// Methods
//====================
/**
 * Render page
 * @param {Object} request
 * @param {Object} header
 */
function render(request, h) 
{
    return new Promise(async function (resolve, reject) {
        resolve(h.view('views/login', { title: 'Login' }, {layout: 'login.layout'}));
    });
}

function login(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        
        // Check if it's already authenticated
        if (request.auth.isAuthenticated)
        {
            stResponse.success = true;
            resolve(stResponse);
        }
            
        const Account = await userService.validLogin(request.payload.email,request.payload.password);
        if(!Account)
        {
            stResponse.success = false;
            stResponse.message = 'Invalid Credentials';
        }
        else
        {
            stResponse.success = true;
            //Create UUID
            const jsid = fw.utils.getUUID();
            // Save data to session
            const serverSession = 
            {
                userAccount:Account, 
                jsid : jsid
            }
            await request.server.app.cache.set(jsid, serverSession , 0);
            // Set Cookie
            request.cookieAuth.set({ jsid });                        
        }

        // Return response
        resolve(stResponse);
    });
}


function logout(request, h)
{
    request.server.app.cache.drop(request.state['jsid'].jsid);
    request.cookieAuth.clear();
    return h.redirect('/');
}

module.exports =
{
    render: render,
    login: login,
    logout: logout
}