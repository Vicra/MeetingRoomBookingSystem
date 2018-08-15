const EventsCtrl = fw.getController('events');

module.exports = 
[
  { method: 'GET', path: '/events', options: { handler: EventsCtrl.renderMain } },
  { method: 'GET', path: '/events/add', options: { handler: EventsCtrl.renderAdd } },
  { method: 'POST', path: '/events/add', 
      options: 
      { 
        handler: EventsCtrl.addEvent, 
        tags: ['api'],
        validate: 
        {
            payload: 
            {
                name:           fw.param.string().required(),
                eventtype:      fw.param.number().required(),
                roomid:         fw.param.number().required(),
                userid:         fw.param.number().required(),
                date:           fw.param.string().required(),
                starttime:      fw.param.string().required(),
                endtime:        fw.param.string().required(),
                participants:   fw.param.array().required()
            }
        }
      },
  }
];