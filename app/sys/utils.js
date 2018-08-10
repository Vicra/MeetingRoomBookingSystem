/**
 * File: Utils.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Misc Utilities
 * 
 * TODO: Clean this
 */

const fs = require('fs');
const glob = require('glob');
const uuid = require('uuid/v1');
const crypto = require('crypto');
const dateformat = require('dateformat');
const stream = require('stream');
const os = require('os');
const path = require('path');

function getMD5(data)
{
    return crypto.createHash('md5').update(data).digest("hex");
}

function getUUID()
{
    return uuid();
}

function getSalt()
{
    return encrypt('SHA256',getUUID());
}

function encrypt(algorithm ,data)
{
    return crypto.createHmac(algorithm, fw.settings.EncryptionKey)
        .update(data)
        .digest('hex');
}

function getFiles(path, realpath) {
    return glob.sync(path, {
        cwd: require('path').join(__dirname, '..'),
        nodir: true,
        realpath: realpath
    });
};

function loadFiles(path) {
    return getFiles(path, true).map(function(file) {
        return require(file);
    });
};

function isFile(path) {
    try {
        var check = fs.lstatSync(path).isFile();
    } catch(e) {
        throw e;
        return false;
    }
    return check;
};

function isDirectory(path) {
    return !isFile(path);
};

const isArray = Array.isArray;

function isObject(arg) {
    return arg !== null && typeof arg === 'object';
};

function isString(arg) {
    return typeof arg === 'string';
};

function isFunction(arg) {
    return typeof arg === 'function';
};

function isPromise(arg) {
    return isObject(arg) && isFunction(arg.then);
};

function isDefined(arg) {
    return typeof arg !== 'undefined';
};

function isUndefined(arg) {
    return typeof arg === 'undefined';
};

function isReadableStream(obj) {
    return obj instanceof stream.Stream &&
      typeof (obj._read === 'function') &&
      typeof (obj._readableState === 'object');
  }

function pad(n, width, z) 
{
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function arraymove(arr,from, to) 
{
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};

module.exports = 
{
    os,
    path,
    getMD5,
    encrypt,
    getSalt,
    getUUID,
    getFiles,
    loadFiles,
    isFile,
    isDirectory,
    isArray,
    isObject,
    isString,
    isFunction,
    isPromise,
    isDefined,
    isUndefined,
    dateformat,
    isReadableStream,
    pad,
    arraymove
};