const UsersCtrl = fw.getController('users');

module.exports = 
[
  { method: 'GET', path: '/users', options: { handler: UsersCtrl.renderMain } },
  { method: 'GET', path: '/users/view', options: { handler: UsersCtrl.renderView } },
  { method: 'GET', path: '/users/edit', options: { handler: UsersCtrl.renderEdit } },
  { method: 'GET', path: '/users/add', options: { handler: UsersCtrl.renderAdd } },
  { method: 'POST', path: '/users/add', 
      options: 
      { 
        handler: UsersCtrl.addUser, 
        tags: ['api'],
        validate: 
        {
            payload: 
            {
                name:         fw.param.string().required(),
                password:     fw.param.string().required(),
                salary:       fw.param.number().required(),
                startingdate: fw.param.string().required(),
                email:        fw.param.string().required(),
                departmentid: fw.param.string().required(),
                roleid:       fw.param.string().required()
            }
        }                
      },
  },
  { 
    method: 'POST', path: '/users/edit', 
      options: 
      { 
        handler: UsersCtrl.editUser, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
              userid:       fw.param.number().required(),
              salary:       fw.param.number().required(),
              startingdate: fw.param.date().required(),
              email:        fw.param.string().email().required(),
              departmentid: fw.param.number().required(),
              roleid:       fw.param.number().required()
          }        
        }
      }
  },
  { 
    method: 'POST', path: '/users/delete', 
      options: 
      { 
        handler: UsersCtrl.deleteUser, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
              userid:       fw.param.number().required(),
          }        
        }        
      } 
  }
];