'use strict';

module.exports = async (server) => 
{
    try 
    {
        // Register
        await server.register(require('hapi-auth-cookie'));

        // Cache for sessions
        fw.cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
        server.app.cache = fw.cache;

        // Auth Cookie
        server.auth.strategy('session', 'cookie',  
        {
            password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
            redirectTo: '/login',
            cookie: 'jsid', // Cookie name
            isSecure: false, // required for non-https applications
            ttl: 24 * 60 * 60 * 1000,
            validateFunc: await fw.getController('security').validate
        });
        server.auth.default('session');
        
    } catch (e) {
        console.error('Error on hapi-auth-cookie Plugin', e);
        throw e
    }
    
    console.log(['info', 'plugin'], 'plugin: Hapi-auth-cookie registered');
    return true;
};