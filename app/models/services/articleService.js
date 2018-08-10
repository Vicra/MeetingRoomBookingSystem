//====================
// Dependencies
//====================
const articleDAO = fw.getDAO('article');

//====================
// Methods
//====================

async function getArticles()
{
    return await articleDAO.getArticles();
}

async function getArticleByName(email)
{
    return await articleDAO.getArticleByName(email);
}

async function getArticleById(id)
{
    return await articleDAO.getArticleById(id);
}

async function getArticlesByRoomId(id)
{
    return await articleDAO.getArticlesByRoomId(id);
}

async function getArticle(id)
{
    return await articleDAO.getArticle(id);
}

async function addArticle(data)
{
    return await articleDAO.addArticle(data);
}

async function updateArticle(data)
{
    return await articleDAO.updateArticle(data);
}

async function deleteArticle(data)
{
    return await articleDAO.deleteArticle(data);
}

module.exports = 
{
    getArticles,
    getArticle,
    getArticleByName,
    getArticleById,
    getArticlesByRoomId,
    addArticle,
    updateArticle,
    deleteArticle
}