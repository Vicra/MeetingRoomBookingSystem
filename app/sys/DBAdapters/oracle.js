/**
 * File: oracle.js
 * Author: Mario Nuñez
 * Version: 1.0
 * Description: Oracle Adapter, Handles connections made to oracle databases
 */

class oracleAdapter 
{
    constructor(config)
    {
        this.oracledb = require('oracledb');
        this.SimpleOracleDB = require('simple-oracledb');
        this.SimpleOracleDB.extend(this.oracledb);
        this.pool = null;
        this.conn = null;
        this.dbconfig = config;    
    }
    
    buildConnectionString()
    {
        return `( DESCRIPTION = 
                    ( ADDRESS_LIST = 
                        ( ADDRESS = 
                            (PROTOCOL = TCP)
                            (HOST = ${this.dbconfig.SERVER})
                            (PORT = ${this.dbconfig.PORT})
                        ) 
                    ) 
                    ( CONNECT_DATA = 
                        (SID = ${this.dbconfig.SID}) 
                        (SERVER = DEDICATED) 
                    )
                )`;
    }
    
    async getConnection()
    {
        this.pool = await this.oracledb.createPool ({
            user            : this.dbconfig.USERNAME,
            password        : this.dbconfig.PASSWORD,
            connectionString: this.buildConnectionString(),
        });
        this.startTime = new Date();
        this.conn = await this.pool.getConnection();
        return this.conn;
    }
    
    async closeConn()
    {
        if(this.conn) await this.conn.release();
        this.conn = null;
    }
    
    async closePool()
    {
        if(this.pool.connectionsOpen)
        {
            return await this.pool.close();
            this.pool = null;
        }            
        
        return false;
    }
    
    async commit()
    {
        await this.conn.commit();
    }
    
    async execute(sql,props)
    {
        
        if(this.conn == null)  await this.getConnection(); 
        return await this.conn.execute(sql,props);
    }
    
    async closeAll()
    {        
        await this.closeConn();
        await this.closePool();
    }    
}

module.exports = oracleAdapter;