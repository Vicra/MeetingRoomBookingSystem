//====================
// Dependencies
//====================
const eventTypeService = fw.getService('eventType');

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
        const eventTypes = await eventTypeService.getEventTypes();
        resolve(h.view('views/event-types/main', {eventTypes, session: request.auth.credentials}));
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
        const eventType = await eventTypeService.getEventTypeById(request.query.id);
        
        if(eventType.length != 1)
        {
            resolve(h.redirect('/event-types'));
            return;
        }

        resolve(h.view('views/event-types/edit', 
        {
            eventType:eventType[0],
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
        resolve(h.view('views/event-types/add', 
        {
            session: request.auth.credentials
        }));
    });
    
}


function addEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeByName(request.payload.name);
        if(eventType.length > 0)
        {
            stResponse.message = "Event Type already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description
        }
    
        await eventTypeService.addEventType(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeById(request.payload.id);
        if(eventType.length != 1)
        {
            stResponse.message = "Event Type does not exist";
            resolve(stResponse);
            return;
        }

        if(request.payload.name != eventType[0].name)
        {
            const eventTypeExists = await eventTypeService.getEventTypeByName(request.payload.name);
            if(eventTypeExists.length > 0 && eventTypeExists.name == request.payload.name)
            {
                stResponse.message = "Event Type name is already in use.";
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
    
        await eventTypeService.updateEventType(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteEventType(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const eventType = await eventTypeService.getEventTypeById(request.payload.id);
        if(eventType.length != 1)
        {
            stResponse.message = "EventType does not exist";
            resolve(stResponse);
            return;
        }

        await eventTypeService.deleteEventType(request.payload.id);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    renderMain,
    renderEdit,
    renderAdd,
    addEventType,
    editEventType,
    deleteEventType
}