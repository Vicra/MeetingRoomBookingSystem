/**
 * File: fw.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Framework Main
 */

const fw = global['fw'] = {};

fw.utils = require('./utils');
fw.db = new (require('./dbmanager'));
fw.settings = require('../../config/settings.json');
fw.joi = require('joi');
fw.boom = require('boom');
fw._ = require('lodash');

// alias
fw.param = fw.joi;
fw.lodash = fw._;

fw.promise = (fn) =>
{
    return new Promise(async function(resolve,reject)
    {
        let err = '';
        await fn(resolve,reject).catch(function(ex)
        {            
            console.error(ex);
            fw.server.log(['error'],ex,ex);
                
            reject(ex);
        });
    });
}


fw.getController = (name) => 
{
    return require('../controllers/'+name+'.js');
};

fw.getDAO = (name) => 
{
    return require('../models/DAO/'+name+'DAO.js');
};

fw.getService = (name) => 
{
    return require('../models/services/'+name+'Service.js');
};