//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getArticles()
{
    const SQL = 
    `SELECT * FROM Articles`;
    return await fw.db.execute('local',SQL);
}

async function getArticle(id)
{
    const SQL = 
    `SELECT * FROM Articles WHERE id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function getArticleByName(name)
{
    const SQL = 
    `SELECT * FROM Articles
    WHERE name = ?`;
    return await fw.db.execute('local',SQL,[name]);
}

async function getArticleById(id)
{
    const SQL = 
    `SELECT * FROM Articles
    WHERE id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function getArticlesByRoomId(id)
{
// SELECT a.id, a.name, b.amount FROM (
//         SELECT * 
//         FROM crud.Articles) as a
// LEFT OUTER JOIN (SELECT a.id, a.name, ra.amount FROM Articles a
//             LEFT OUTER JOIN Rooms_Articles ra on ra.article_id = a.id
//             LEFT OUTER JOIN Rooms r on r.id = ra.room_id
//             WHERE r.id = 10) b on b.id = a.id
// order by a.id asc;
    const SQL = 
    `SELECT a.id, a.name, b.amount FROM (
            SELECT * 
            FROM crud.Articles) as a
    LEFT OUTER JOIN (SELECT a.id, a.name, ra.amount FROM Articles a
                LEFT OUTER JOIN Rooms_Articles ra on ra.article_id = a.id
                LEFT OUTER JOIN Rooms r on r.id = ra.room_id
                WHERE r.id = ?) b on b.id = a.id
    order by a.id asc;`;
    return await fw.db.execute('local',SQL,[id]);
}

async function addArticle(data)
{
    const SQL = 
    `INSERT INTO Articles(name, description)
    VALUES
    (?,?)`;
    return await fw.db.execute('local',SQL,
    [
        data.name,
        data.description
    ]);
}

async function updateArticle(data)
{
    const SQL = 
    `UPDATE Articles
    SET name = ?,
    description = ?
    WHERE id = ?`;
    return await fw.db.execute('local',SQL,
    [
        data.name, 
        data.description, 
        data.id
    ]);
}

async function deleteArticle(id)
{

    const deleteRoomArticlesSQL = 
    `DELETE FROM Rooms_Articles
    WHERE article_id = ?`;
    await fw.db.execute('local',deleteRoomArticlesSQL,[id]);

    const deleteArticleSQL = 
    `DELETE FROM Articles
    WHERE id = ?`;
    return await fw.db.execute('local',deleteArticleSQL,[id]);
}


module.exports = 
{
    getArticleByName,
    getArticlesByRoomId,
    getArticleById,
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle
}