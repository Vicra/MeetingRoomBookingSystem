const loginCtrl = fw.getController('auth');

module.exports =
[
    { 
        method: 'GET', path: '/login', options: 
        { 
            handler: loginCtrl.render, 
            auth: false
        } 
    },
    { 
        method: 'POST', path: '/auth', options: 
        { 
            handler: loginCtrl.login, 
            auth: false,
            tags: ['api'],
            validate: 
            {
                payload: 
                {
                    email: fw.param.string().required(),
                    password: fw.param.string().required()
                }
            }
        } 
    },
    { 
        method: 'GET', path: '/logout', options: 
        { 
            handler: loginCtrl.logout
        } 
    }        
];