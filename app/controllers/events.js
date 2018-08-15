//====================
// Dependencies
//====================
const eventService = fw.getService('event');
const eventTypeService = fw.getService('eventType');
const userService = fw.getService('user');

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
        const events = await eventService.getUpcomingEvents();
        resolve(h.view('views/events/main', {
            events, 
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
        resolve(h.view('views/events/add', 
        {
            session: request.auth.credentials,
            eventTypes: await eventTypeService.getEventTypes(),
            users: await userService.getUsers()
        }));
    });
    
}

function addEvent(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};

        const Params = 
        {
            name: request.payload.name,
            eventtype: request.payload.eventtype,
            roomid: request.payload.roomid,
            userid: request.payload.userid,
            date: request.payload.date,
            starttime: request.payload.starttime,
            endtime: request.payload.endtime,
            participants: request.payload.participants
        }
    
        await eventService.addEvent(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

module.exports = 
{
    renderMain : renderMain,
    renderAdd : renderAdd,
    addEvent : addEvent
}