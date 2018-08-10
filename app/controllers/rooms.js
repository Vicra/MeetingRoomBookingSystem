//====================
// Dependencies
//====================
const roomService = fw.getService('room');
const rolesService = fw.getService('roles');
const articleService = fw.getService('article');

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
        const rooms = await roomService.getRooms();
        resolve(h.view('views/rooms/main', {rooms, session: request.auth.credentials}));
    });    
}

/**
 * Render View page
 * @param {Object} request
 * @param {Object} h 
 */
function renderView(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        const room = await roomService.getRoom(request.query.id);
        
        if(room.length != 1)
        {
            resolve(h.redirect('/rooms'));
            return;
        }

        resolve(h.view('views/rooms/view', {
            room:room[0], 
            session: request.auth.credentials,
            articles: await articleService.getArticlesByRoomId(request.query.id)
        }));
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
        const room = await roomService.getRoom(request.query.id);
        
        if(room.length != 1)
        {
            resolve(h.redirect('/rooms'));
            return;
        }

        resolve(h.view('views/rooms/edit', 
        {
            room:room[0],
            session: request.auth.credentials,
            articles: await articleService.getArticlesByRoomId(request.query.id)
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
        resolve(h.view('views/rooms/add', 
        {
            session: request.auth.credentials,
            articles: await articleService.getArticles()
        }));
    });
    
}


function addRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomService.getRoomByName(request.payload.name);
        if(room.length > 0)
        {
            stResponse.message = "Room already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            peopleCount: request.payload.peopleCount,
            articles: request.payload.articles
        }
    
        await roomService.addRoom(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomService.getRoom(request.payload.id);
        if(room.length != 1)
        {
            stResponse.message = "Room does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.name != room[0].name)
        {
            const roomExist = await roomService.getRoomByName(request.payload.name);
            if(roomExist.length > 0)
            {
                stResponse.message = "Meeting name is already in use.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            peopleCount: request.payload.peopleCount,
            id: request.payload.id,
            articles: request.payload.articles
        }
        await roomService.updateRoom(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteRoom(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const room = await roomService.getRoom(request.payload.id);
        if(room.length != 1)
        {
            stResponse.message = "Room does not exist";
            resolve(stResponse);
            return;
        }

        await roomService.deleteRoom(request.payload.id);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    renderMain,
    renderView,
    renderEdit,
    renderAdd,
    addRoom,
    editRoom,
    deleteRoom
}