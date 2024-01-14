//const mongoose = require('../../config/mongoose');
import mongoose, { ConnectOptions, Connection, Model } from "mongoose";
import { model, connect } from 'mongoose';
import config from "../../config";
//import { getAuth } from "../../libery/auth";
import dayjs from 'dayjs'
import { getAuth } from "../../libery/auth";
//const modelName="";
//const { mongoConfig } = config;
const {sessionSecret,mongoConfig}=config;
export class MongoAdepter {
  private options :ConnectOptions ={
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //reconnectInterval: 1000, // Reconnect every 500ms
    //poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    //bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    //useUnifiedTopology: true
  }
  private  Uri =""
  private conn :Connection|null=null
  constructor(){
    mongoose.set("debug", process.env.NODE_ENV != "production");
    mongoose.Promise = Promise;
    const userAuth =getAuth(mongoConfig.options.token,sessionSecret);
    const user = {
      user: mongoConfig.options.user || userAuth?.user || "",
      pass: mongoConfig.options.pass || userAuth?.pass || "",
    }
    this.Uri = `mongodb://${user.user}:${encodeURIComponent(user.pass)}@${mongoConfig.server}/${mongoConfig.database}`
    this.connect()
  }
  connect(){
    this.conn = mongoose.createConnection(this.Uri,this.options);
   
    this.conn.on('connected', stream => {
      this.onConnected(stream)
    });
    this.conn.on('error', err => {
      this.onError(err)
    });
    this.conn.on('disconnected', () => {
      this.onDisconnected()
    });
    
   
   
  } 
  async disconnect(): Promise<void> {
    if(this.conn)
      await this.conn.close();
  }
  
  onDisconnected(){
   
    console.log('connection disconnected');
    console.log(this.conn?.config)
  }
  onConnected(stream:any){
    console.log('connected to mongodb!');
    if(this.conn) {
      console.log("config",this.conn.host,this.conn.db.databaseName)
    }
  }
  onError(err:any){
    console.log("mongo error",err);
    if(this.conn) {
      console.log("config",this.conn.host,this.conn.db.databaseName)
    }
  }
  Conn () {

    return this.conn
  }
  
    
}








//const userAuth =getAuth(mongoConfig.options.token,sessionSecret);




//mongoConfig.Uri="mongodb://admin_invtdb:EPP%40iot480%28%29%25@172.18.0.103/invtdb"





