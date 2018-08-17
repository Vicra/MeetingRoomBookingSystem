//====================
// Dependencies
//====================
const roomService = fw.getService('room');

//====================
// Methods
//====================
/**
 * Render page
 * @param {Object} request
 * @param {Object} h 
 */
function render(request,h)
{
    return fw.promise(async (resolve,reject) => 
    {
        resolve(h.view('views/index', {
            title:'Home Page',
            rooms: await roomService.getTodayDashboard()
        }));
    });
    
}

module.exports = 
{
    render : render
}