/**
 * File: hapi-auth-jwt2.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Auth by JWT Token plugin for HapiJS
 */

const validate = async function (decoded, request) 
{    
    return { isValid: true };
};
 

module.exports = async (server) => 
{
    try 
    {
        await server.register(require('hapi-auth-jwt2'));
    } catch (e) {
        console.error('Error on hapi-auth-jwt2 Plugin', e);
        throw e;
    }
    
    server.auth.strategy('jwt', 'jwt',
    { key: fw.settings.SessionKey,
      validate: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    });

    console.log(['info', 'plugin'], 'plugin: Hapi-auth-jwt2 registered');

    return true;
};