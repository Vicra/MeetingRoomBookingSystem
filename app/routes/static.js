/*
    Note: In production assets should be served by web server. Ex: Apache/Nginx
*/

module.exports = 
[
  { 
    method: 'GET', path: '/assets/{path*}', 
    handler: 
    {
        directory: 
        {
            path: `${__dirname}/../assets`,
            index: false
        }
    },
    options:
    {
        auth: false
    }
 }
];