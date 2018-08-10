//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getRooms()
{
    const SQL = 
    `SELECT * FROM Rooms`;
    return await fw.db.execute('local',SQL);
}

async function getRoom(id)
{
    const SQL = 
    `SELECT * FROM Rooms WHERE id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function getRoomByName(name)
{
    const SQL = 
    `SELECT * FROM Rooms
    WHERE UPPER(name) = ?`;
    return await fw.db.execute('local',SQL,[`${name.toUpperCase()}`]);
}

async function addRoom(data)
{
    const SQL = 
    `INSERT INTO Rooms(name, description, people_count, image)
    VALUES
    (?,?,?,?)`;
    var databaseResponse = await fw.db.execute('local',SQL,
    [
        data.name,
        data.description,
        data.peopleCount,
        "", //image path
    ]);

    for (let index = 0; index < data.articles.length; index++) {
        const articleId = data.articles[index].articleid;
        const amountArticles = data.articles[index].amount;
        
        const SQL = 
        `INSERT INTO Rooms_Articles(room_id, article_id, amount)
        VALUES
        (?,?,?)`;
        await fw.db.execute('local',SQL,[databaseResponse.insertId, articleId, amountArticles]);
    }
    return databaseResponse;
}

async function updateRoom(data)
{
    //update room info
    const updateRoomSQL = 
    `UPDATE Rooms
    SET name = ?,
    description = ?,
    people_count = ?,
    image = ?
    WHERE ID = ?`;
    
    await fw.db.execute('local',updateRoomSQL,
    [
        data.name, 
        data.description, 
        data.peopleCount, 
        "", //image path
        data.id
    ]);

    //delete all existing articles linked to the room
    const deleteSQL = 
    `DELETE FROM Rooms_Articles
    WHERE room_id = ?`;
    await fw.db.execute('local',deleteSQL,
    [
        data.id
    ]);
    
    //insert new articles linked to the room, in case there are any
    for (let index = 0; index < data.articles.length; index++) {
        const articleId = data.articles[index].articleid;
        const amountArticles = data.articles[index].amount;
        
        const insertSQL = 
        `INSERT INTO Rooms_Articles(room_id, article_id, amount)
        VALUES
        (?,?,?)`;
        await fw.db.execute('local',insertSQL,
        [
            data.id, 
            articleId, 
            amountArticles
        ]);
    }
}

async function deleteRoom(id)
{
    //delete articles linked to the room
    const deleteSQL = 
    `DELETE FROM Rooms_Articles
    WHERE room_id = ?`;
    await fw.db.execute('local',deleteSQL,
    [
        id
    ]);

    // delete room
    const deleteRoomSQL = 
    `DELETE FROM Rooms
    WHERE ID = ?`;
    await fw.db.execute('local',deleteRoomSQL,[id]);

    return;
}

async function hasArticles(id)
{
    const SQL = 
    `SELECT * 
    FROM Rooms_Articles 
    WHERE room_id = ?`;
    var response = await fw.db.execute('local',SQL,[id]);
    return (response.length) ? true : false;
}

module.exports = 
{
    getRoomByName,
    getRooms,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom,
    hasArticles
}