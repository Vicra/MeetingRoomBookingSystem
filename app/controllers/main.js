//====================
// Dependencies
//====================
// None

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
        resolve(h.view('views/index', {title:'Home Page'}));
    });
    
}

module.exports = 
{
    render : render
}