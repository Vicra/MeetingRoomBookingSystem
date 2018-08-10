//====================
// Dependencies
//====================
const roomDAO = fw.getDAO('room');

//====================
// Methods
//====================

async function getRooms()
{
    return await roomDAO.getRooms();
}

async function getRoomByName(email)
{
    return await roomDAO.getRoomByName(email);
}

async function getRoom(id)
{
    return await roomDAO.getRoom(id);
}

async function addRoom(data)
{
    return await roomDAO.addRoom(data);
}

async function updateRoom(data)
{
    return await roomDAO.updateRoom(data);
}

async function deleteRoom(data)
{
    return await roomDAO.deleteRoom(data);
}

module.exports = 
{
    getRooms,
    getRoom,
    getRoomByName,
    addRoom,
    updateRoom,
    deleteRoom
}