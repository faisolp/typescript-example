
//const mongoose = require('../../config/mongoose');
import mongoose, { Model } from "mongoose";
import {model,connect } from 'mongoose';
import config from "./../config";
import { getAuth } from "./../libery/auth";
import dayjs from 'dayjs'

const {MaxRecord}=config;

mongoose.set("debug",process.env.NODE_ENV !="production");
mongoose.Promise =Promise;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //reconnectInterval: 1000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
  };


  const {sessionSecret,mongoConfig}=config;
  
  const userAuth =getAuth(mongoConfig.options.token,sessionSecret);
  const option ={
    user:userAuth?.user||"",
    pass:userAuth?.pass||"",
  }
 
  mongoConfig.Uri=`mongodb://${option.user}:${encodeURIComponent(option.pass)}@${mongoConfig.server}/${mongoConfig.database}`
  //mongoConfig.Uri="mongodb://admin_invtdb:EPP%40iot480%28%29%25@172.18.0.103/invtdb"

  connect(mongoConfig.Uri,option).then(result=>{
    console.log('Mongo Connected');
    
  }).catch(err=>{
    console.log("Mongo error",err);
  })

 //options 
 //{ patch: true, upsert: true, remove: false, projection: {}, returnDocument: 'after', returnOriginal: false}

 
 export default  class MongoDbController<T1=any>{
  protected  model:Model<T1>

  constructor( model:Model<T1>){
    this.model=model
  }

  query2filter(filter:any={}){

    if(filter.lastUpdate){
      filter.modifiedDate={"$gt":new Date(filter.lastUpdate)} 
      delete filter.lastUpdate
    }
    if(filter.lastId){
      filter._Id={"$gt":filter.lastId} 
      delete filter.lastId
    }
    if(filter.wh && Array.isArray(filter.wh)){
      filter.wh={$in:filter.wh} 
      //delete filter.lastId
    }
    
    return filter
  }

  async get(filter:any={},project={},sort:{}={_id:1},limit=MaxRecord.default) {
    
    filter=this.query2filter(filter)
    
    if(filter.top){
      limit=Number(filter.top) 
      delete filter.top
    }
    let stream:T1[]=[];
    console.log("get filter",filter)
    try{    
      stream= await this.model
        .find(filter,project)
        .limit(limit)
        .sort(sort)
        .exec();
          
       
        
    } catch (e) {
            console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
       
    }
   
    return  stream;
  }

  async getOne(filter={},project={},sort={},limit=100) {
  
    let stream:any
    try{    
      stream= await this.model
        .findOne(filter,project)
        .limit(limit)
        .sort(sort)
        .exec();
    } catch (e) {
      console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
    }
 
    return  stream;
  }



  async patch (filter={},data:T1|T1[]) {
    
    let options ={patch:true,upsert:false,new:false}
    let stream:T1|T1[]|null=[];
    try
    {    
      const execRecord =async(_item:any)=>{
          _item.modifiedDate= new Date()
          let _stream= await this.model
          .findOneAndUpdate(filter,_item,options)
          .exec();
          return _stream
      }

      if(Array.isArray(data)) {
        for(let i=0;i<data.length;++i){ 
          let _ret=await execRecord(data[i])
          if(_ret) stream.push( _ret)
        }
      } else{
        stream=await execRecord(data)
      }
    }
    catch(e){
          console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
        // return {statusMessage:e,statusCode:999};
    }
    return  stream;

  }
  async put(filter={},data:T1|T1[]){
  
    let options ={patch:false,upsert:false,new:false}
    let stream:T1|T1[]|null=[];
    try
    {    

      const execRecord =async(_item:any)=>{
        _item.modifiedDate= new Date()
        let _stream= await this.model
        .findOneAndUpdate(filter,_item,options)
        .exec();
        return _stream
      }

      if(Array.isArray(data)) {
        for(let i=0;i<data.length;++i){ 
          let _ret=await execRecord(data[i])
          if(_ret) stream.push( _ret)
        }
      } else{
        stream=await execRecord(data)
      }
    }
    catch(e){
          console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
        // return {statusMessage:e,statusCode:999};
    }
    return  stream;
  }
  async upsert  (filter={},data:T1|T1[],isCheckUpdate:boolean=false) {
  //let model = require("mongoose").model(modelName);
  

    let options ={patch:false,upsert:true,new:true}
    let stream:T1|T1[]|null=[];
    try
    {    
      const execRecord =async(_item:any)=>{
        if(!isCheckUpdate ||(isCheckUpdate && await this.IsUpdate(_item._id,new Date(_item.modifiedDate)))){
          _item.modifiedDate= new Date()
          if( _item._id )
            filter ={...filter,_id:_item._id}
          let _stream= await this.model
          .findOneAndUpdate(filter,_item,options)
          .exec();
          return _stream
        }
        return null
      }

      if(Array.isArray(data)) {
        for(let i=0;i<data.length;++i){ 
          let _retRecord=await execRecord(data[i]) 
          if(_retRecord)
            stream.push( _retRecord)
        }
      } else{
        stream=await execRecord(data)
      }

    }
    catch(e){
          console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
        // return {statusMessage:e,statusCode:999};
    }
    return  stream;

  }
  async post  (data:T1|T1[],isCheckDuplicate:boolean=true) {
    let stream:T1[]|T1|null=[];
    try {
      const execRecord =async(_item:any)=>{
        //let _stream:T1
        let _isExit=await this.IsExist(_item._id)
        if(!isCheckDuplicate||isCheckDuplicate && !_isExit){
          _item.modifiedDate= new Date()
          let _stream=  await this.model.create(_item);
          return _stream 
            //JournalStockItemRealmController.AddQty(_item.stockItemRefId,_item.counting)
        }
        return null

      }
      
      if(Array.isArray(data)) {
        for(let i=0;i<data.length;++i){ 
          let _retItem=await execRecord(data[i])
          if(_retItem){
            stream.push( _retItem)
          }
        }
        //return stream
      } else
        stream=await execRecord(data)
      
            
       
    }catch(e){
        console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
        
    }
    return  stream
    //return  Data:stream && retData ?stream :{_id:String(stream._id)},;
        
      
  }

  async del   (filter={}) {
    //let model = require("mongoose").model(modelName);
    let stream:any
    try{
        stream= await this.model.deleteMany(filter);
        return {statusMessage:"ok",statusCode:200};
          
    } 
      catch(e){
        //return {statusMessage:e,statusCode:999,Data:[]};
        console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
    
    }
    return stream;
    
  }

  async IsExist  (_id:string|number) {
    let _data =await this.getOne({_id});
    if (_data && _id){
       
        return true;
    }
    return false
}
  async IsUpdate  (_id:string|number,_modifiedDate:Date) {
    let _data =await this.getOne({_id});
    if(_data ){
      let _modifiedDateRecord=_data.modifiedDate
                            ||_data.transDate
                            ||new Date('1900-01-01');
      return  (_modifiedDate>_modifiedDateRecord);
    }
    return true
  }


}


