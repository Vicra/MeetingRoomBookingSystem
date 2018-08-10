/**
 * File: DBManager.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: DBManager Class declaration, handles connections to database
 */

class dbmanager
{
    constructor()
    {
        this.fs = require('fs');
    }

    getEnvironment()
    {
        return process.env.NODE_ENV || 'DEV';
    }

    getDBConfig()
    {
        return JSON.parse(this.fs.readFileSync(__dirname + '/../../config/db_credentials.json', 'utf8'));
    }


    async execute(datasource,sql,parameters)
    {
        const dbconfig = this.getDBConfig()[this.getEnvironment()][datasource];
        if(!dbconfig) throw(`Datasource '${datasource}' was not found on ${this.getEnvironment()} environment.`);

        let result,Adapter;
        switch(dbconfig.TYPE)
        {
            case "ORACLE":
                Adapter = require('./DBAdapters/oracle');
                const oracleConn = new Adapter(dbconfig);
                result = await oracleConn.execute(sql,parameters);
                oracleConn.closeAll();
                return result;
            break;
            case "MYSQL":
                Adapter = require('./DBAdapters/mysql');
                const mysqlConn = new Adapter(dbconfig);
                result = await mysqlConn.execute(sql,parameters);
                mysqlConn.close();
                return result;
            break;
            default:
                throw('Unhandled database type: ' + dbconfig.TYPE);
        }
    }
        

    
}

module.exports = dbmanager;