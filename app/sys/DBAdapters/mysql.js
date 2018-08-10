/**
 * File: mysql.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: MYSQL Adapter, Handles connections made to MYSQL databases
 */

class mysqlAdapter 
{
    constructor(config)
    {
        this.dbconfig = config;
        this.mysql = require('promise-mysql');
        this.conn = null;
    }


    async createConnection()
    {
        return await this.mysql.createConnection
        ({
            host: this.dbconfig.SERVER,
            user: this.dbconfig.USERNAME,
            password: this.dbconfig.PASSWORD,
            database: this.dbconfig.DATABASE
        });
    }


    async execute(sql,options)
    {
        this.conn = this.conn || await this.createConnection();
        return await this.conn.query(sql,options);
    }


    async close()
    {
        await this.conn.end();
    }
}

module.exports = mysqlAdapter;