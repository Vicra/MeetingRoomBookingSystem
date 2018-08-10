/**
 * File: hapi-swagger.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Swagger UI plugin for HapiJS
 * Dependecies: Inert,Vision plugins
 */

'use strict';
const packageInfo = require('../../../package');

const swaggerConfig = {
    plugin: require('hapi-swagger'),
    options: {
        //basePath: config.SWAGGER_URL,
        info: {
            title: packageInfo.name,
            version: packageInfo.version
        },
        auth: 'simple',
        documentationPath: '/documentation',
        securityDefinitions: {
            'jwt': {
                'type': 'apiKey',
                'name': 'Authorization',
                'in': 'header'
            }
        },
        security: [{ 'jwt': [] }]        
    }
};


module.exports = async (server) => 
{
    try {
        await server.register(swaggerConfig);
    } catch (e) {
        console.error('Error on Swagger Plugin', e);
        throw e
    }
    console.log(['info', 'plugin'], 'plugin: Swagger registered');

    return true;
};
