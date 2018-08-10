const EventTypesCtrl = fw.getController('event-types');

module.exports = 
[
  { method: 'GET', path: '/event-types', options: { handler: EventTypesCtrl.renderMain } },
  { method: 'GET', path: '/event-types/edit', options: { handler: EventTypesCtrl.renderEdit } },
  { method: 'GET', path: '/event-types/add', options: { handler: EventTypesCtrl.renderAdd } },
  { method: 'POST', path: '/event-types/add', 
      options: 
      { 
        handler: EventTypesCtrl.addEventType, 
        tags: ['api'],
        validate: 
        {
            payload: 
            {
                name:           fw.param.string().required(),
                description:    fw.param.string().required()
            }
        }                
      },
  },
  { 
    method: 'POST', path: '/event-types/edit', 
      options: 
      { 
        handler: EventTypesCtrl.editEventType, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
              id:             fw.param.number().required(),
              name:           fw.param.string().required(),
              description:    fw.param.string().required()
          }        
        }
      }
  },
  { 
    method: 'POST', path: '/event-types/delete', 
      options: 
      { 
        handler: EventTypesCtrl.deleteEventType, 
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