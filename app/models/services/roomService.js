//====================
// Dependencies
//====================
const roomDAO = fw.getDAO('room');
const eventDAO = fw.getDAO('event');

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

async function hasArticles(data)
{
    return await roomDAO.hasArticles(data);
}

async function getTodayDashboard()
{
    var rooms = await roomDAO.getRooms();
    var todayEvents = await eventDAO.getTodayEvents();
    var returnObject = [];
    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < todayEvents.length; j++) {
            if(todayEvents[j].room == rooms[i].name){

                returnObject.push(
                    {
                        name: rooms[i].name,
                        event:""
                    }
                );
            }
        }
    }
    return returnObject;
    // return [
    //     {
    //         name: "roomName",
    //         events: [
    //             {
    //                 name: "eventName",
    //                 starttime: "7:00",
    //                 endtime: "8:05",
    //                 eventType: "event-1"
    //             },
    //             {
    //                 name: "eventName2",
    //                 starttime: "8:15",
    //                 endtime: "9:00",
    //                 eventType: "event-2"
    //             }
    //         ]
    //     },
    //     {
    //         name: "roomName2",
    //         events: [
    //             {
    //                 name: "eventName3",
    //                 starttime: "8:00",
    //                 endtime: "9:00",
    //                 eventType: "event-3"
    //             },
    //             {
    //                 name: "eventName4",
    //                 starttime: "10:00",
    //                 endtime: "11:00",
    //                 eventType: "event-4"
    //             }
    //         ]
    //     }
    // ];
}

module.exports = 
{
    getRooms,
    getRoom,
    getRoomByName,
    addRoom,
    updateRoom,
    deleteRoom,
    hasArticles,
    getTodayDashboard
}