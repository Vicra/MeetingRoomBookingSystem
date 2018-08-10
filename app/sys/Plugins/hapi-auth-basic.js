/**
 * File: hapi-auth-basic.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Auth basic plugin for HapiJS
 */

'use strict';

const devuser = 
{
    username: 'dev',
    password: 'dev' 
};

const validate = async (request, username, password, h) => {

    const user = devuser.username;
    if (!user) {
        return { credential: null, isValid: false };
    }

    let isValid = false;
    const credentials = { id: user.id, name: user.name };
    try {
        isValid = await password === devuser.password;
    } catch (e) {

    }

    return { credentials, isValid };

};

module.exports = async (server) => 
{
    try 
    {
        await server.register(require('hapi-auth-basic'));
    } catch (e) {
        console.error('Error on hapi-auth-basic Plugin', e);
        throw e
    }
    server.auth.strategy('simple', 'basic', { validate });
    console.log(['info', 'plugin'], 'plugin: Hapi-auth-basic registered');

    return true;
};