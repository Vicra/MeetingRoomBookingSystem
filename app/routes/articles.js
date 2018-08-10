const ArticlesCtrl = fw.getController('articles');

module.exports = 
[
  { method: 'GET', path: '/articles', options: { handler: ArticlesCtrl.renderMain } },
  { method: 'GET', path: '/articles/edit', options: { handler: ArticlesCtrl.renderEdit } },
  { method: 'GET', path: '/articles/add', options: { handler: ArticlesCtrl.renderAdd } },
  { method: 'POST', path: '/articles/add', 
      options: 
      { 
        handler: ArticlesCtrl.addArticle, 
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
    method: 'POST', path: '/articles/edit', 
      options: 
      { 
        handler: ArticlesCtrl.editArticle, 
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
    method: 'POST', path: '/articles/delete', 
      options: 
      { 
        handler: ArticlesCtrl.deleteArticle, 
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