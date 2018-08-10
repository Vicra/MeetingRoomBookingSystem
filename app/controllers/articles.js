//====================
// Dependencies
//====================
const articleService = fw.getService('article');
const rolesService = fw.getService('roles');

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
        const articles = await articleService.getArticles();
        resolve(h.view('views/articles/main', {articles, session: request.auth.credentials}));
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
        const article = await articleService.getArticle(request.query.id);
        
        if(article.length != 1)
        {
            resolve(h.redirect('/articles'));
            return;
        }

        resolve(h.view('views/articles/edit', 
        {
            article:article[0],
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
        resolve(h.view('views/articles/add', 
        {
            session: request.auth.credentials
        }));
    });
    
}


function addArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const article = await articleService.getArticleByName(request.payload.name);
        if(article.length > 0)
        {
            stResponse.message = "Article already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description
        }
    
        await articleService.addArticle(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const article = await articleService.getArticleById(request.payload.id);
        if(article.length != 1)
        {
            stResponse.message = "Article does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.name != article[0].name)
        {
            const articleExists = await articleService.getArticleByName(request.payload.name);
            if(articleExists.length > 0 && articleExists.name == request.payload.name)
            {
                stResponse.message = "Article name is already in use.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            id: request.payload.id
        }
    
        await articleService.updateArticle(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const article = await articleService.getArticle(request.payload.id);
        if(article.length != 1)
        {
            stResponse.message = "Article does not exist";
            resolve(stResponse);
            return;
        }

        await articleService.deleteArticle(request.payload.id);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    renderMain,
    renderEdit,
    renderAdd,
    addArticle,
    editArticle,
    deleteArticle
}