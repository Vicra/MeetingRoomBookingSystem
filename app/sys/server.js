/**
 * File: server.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Proyect startup, inits Server instance
 */

'use strict';

require('./fw');
require('dotenv').config();
const Hapi  = require('hapi');

fw.server = new Hapi.Server({
    port: process.env.PORT || 3030,
    host: process.env.HOST || 'localhost',
    routes: 
    {
        cors: true,
        // {
        //     origin: ['http://*.domain.com']
        // } 
    },
    debug: false
    // debug: 
    // { 
    //     request: ['*'],
    //     log: ['*']
    // }
    ,
    cache : [{
            engine    : require('catbox-disk'),
            cachePath: __dirname + '/../../',
            cleanEvery: 3600000,
            partition : 'cache'
    }]   
});

function getRoutes()
{
    let routesPaths = fw.utils.getFiles('routes/**/*.js', true);
    let routes = [];
    let index = 0;

    if(fw.utils.isArray(routesPaths))
    {
        for(let r of routesPaths )
            routes.push(require(r));
    }

    for(let r of routes )
    {        
        if(!fw.utils.isObject(r) || fw.lodash.isEmpty(r))
            throw "Invalid route definition in "+routesPaths[index];

        // Force all routes to display in swagger
        // for(let rx of r)
        // {
        //     if( fw.utils.isArray() )
        //         rx.options.tags.push('api');
        //     else
        //         rx.options.tags = ['api']
        // }

        index++;
    }

    return routes;
}

function getPlugins() 
{
    let pluginsPaths = fw.utils.getFiles('sys/Plugins/**/*.js', true);
    let plugins = [];

    if (fw.utils.isArray(pluginsPaths)) 
    {
        for (let p of pluginsPaths)
            plugins.push(require(p));
    }

    return plugins;
}


async function start(){

    console.log('Starting...');

    try 
    {        
        for (let plugin of getPlugins())
            await plugin(fw.server);

        for(let route of getRoutes())
            fw.server.route(route);

        fw.Handlebars = require('handlebars');
    
        fw.server.views({
            engines: 
            {
                hbs: 
                {
                    module: fw.Handlebars,
                    compileMode: 'sync' // engine specific
                }
            },
            relativeTo: __dirname,
            compileMode: 'async',
            path: '../templates',
            layout: 'default.layout',
            partialsPath: '../templates/partials',
            layoutPath: '../templates/layouts',
            helpersPath: '../templates/helpers'
        });            
        
        // Start server
        await fw.server.start();
        console.log(`Server is running on ${fw.server.info.uri}`);
        console.log(`Enviroment: ${process.env.NODE_ENV || 'development'}`);
    }
    catch(error)
    {        
        console.error(error);
        throw(error);
    }
}

start();