//====================
// Dependencies
//====================
const eventTypeDAO = fw.getDAO('eventType');

//====================
// Methods
//====================

async function getEventTypes()
{
    return await eventTypeDAO.getEventTypes();
}

async function getEventTypeByName(name)
{
    return await eventTypeDAO.getEventTypeByName(name);
}

async function getEventTypeById(id)
{
    return await eventTypeDAO.getEventTypeById(id);
}

async function addEventType(data)
{
    return await eventTypeDAO.addEventType(data);
}

async function updateEventType(data)
{
    return await eventTypeDAO.updateEventType(data);
}

async function deleteEventType(data)
{
    return await eventTypeDAO.deleteEventType(data);
}

module.exports = 
{
    getEventTypes,
    getEventTypeByName,
    getEventTypeById,
    addEventType,
    updateEventType,
    deleteEventType
}