const RoomsCtrl = fw.getController('rooms');

module.exports = 
[
  { method: 'GET', path: '/rooms', options: { handler: RoomsCtrl.renderMain } },
  { method: 'GET', path: '/rooms/view', options: { handler: RoomsCtrl.renderView } },
  { method: 'GET', path: '/rooms/edit', options: { handler: RoomsCtrl.renderEdit } },
  { method: 'GET', path: '/rooms/add', options: { handler: RoomsCtrl.renderAdd } },
  { method: 'POST', path: '/rooms/add', 
      options: 
      { 
        handler: RoomsCtrl.addRoom, 
        tags: ['api'],
        validate: 
        {
            payload: 
            {
                name:           fw.param.string().required(),
                description:    fw.param.string().required(),
                peopleCount:    fw.param.number().required(),
                articles:       fw.param.array().required()
            }
        }                
      },
  },
  { 
    method: 'POST', path: '/rooms/edit', 
      options: 
      { 
        handler: RoomsCtrl.editRoom, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
              id:             fw.param.number().required(),
              name:           fw.param.string().required(),
              description:    fw.param.string().required(),
              peopleCount:    fw.param.number().required(),
              articles:       fw.param.array().required()
          }        
        }
      }
  },
  { 
    method: 'POST', path: '/rooms/delete', 
      options: 
      { 
        handler: RoomsCtrl.deleteRoom, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
              id:       fw.param.number().required(),
          }        
        }        
      } 
  }
];