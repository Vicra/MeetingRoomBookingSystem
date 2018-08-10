//====================
// Dependencies
//====================
//None

//====================
// Methods
//====================
async function getEventTypes()
{
    const SQL = 
    `SELECT * FROM EventTypes`;
    return await fw.db.execute('local',SQL);
}

async function getEventTypeByName(name)
{
    const SQL = 
    `SELECT * FROM EventTypes
    WHERE name = ?`;
    return await fw.db.execute('local',SQL,[name]);
}

async function getEventTypeById(id)
{
    const SQL = 
    `SELECT * FROM EventTypes
    WHERE id = ?`;
    return await fw.db.execute('local',SQL,[id]);
}

async function addEventType(data)
{
    const SQL = 
    `INSERT INTO EventTypes(name, description)
    VALUES
    (?,?)`;
    return await fw.db.execute('local',SQL,
    [
        data.name,
        data.description
    ]);
}

async function updateEventType(data)
{
    const SQL = 
    `UPDATE EventTypes
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

async function deleteEventType(id)
{
    // const deleteRoomEventTypesSQL = 
    // `DELETE FROM Rooms_EventTypes
    // WHERE article_id = ?`;
    // await fw.db.execute('local',deleteRoomEventTypesSQL,[id]);

    const deleteEventTypeSQL = 
    `DELETE FROM EventTypes
    WHERE id = ?`;
    return await fw.db.execute('local',deleteEventTypeSQL,[id]);
}


module.exports = 
{
    getEventTypeByName,
    getEventTypeById,
    getEventTypes,
    addEventType,
    updateEventType,
    deleteEventType
}