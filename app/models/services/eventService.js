//====================
// Dependencies
//====================
const eventDAO = fw.getDAO('event');

//====================
// Methods
//====================

async function getUpcomingEvents()
{
    return await eventDAO.getUpcomingEvents();
}

module.exports = 
{
    getUpcomingEvents
}