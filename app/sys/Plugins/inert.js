/**
 * File: hapi-inert.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Static file and directory handlers for HapiJS
 */
'use strict';

module.exports = async (server) => 
{
    try 
    {
        // Register
        await server.register(require('inert'));
    } catch (e) {
        console.error('Error on inert Plugin', e);
        throw e
    }
    
    console.log(['info', 'plugin'], 'plugin: inert registered');
    return true;
};