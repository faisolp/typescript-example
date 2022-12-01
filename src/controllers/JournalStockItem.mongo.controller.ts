
import  { Types } from "mongoose";
import { JournalStockItemModel } from "../models/mongodb";
import { IJournalStockItem } from "../models/mongodb/JournalStockItem.mongo.model";
import MongoDbController from "./mongodb.controller";


import config from '../config'
const {MaxRecord}=config;

export default class JournalStockItemMongoController  extends MongoDbController<IJournalStockItem> {
    constructor(){
        super(JournalStockItemModel)
    }

    override query2filter(filter:any={}){

        if(filter.lastUpdate){
         // filter.modifiedDate={"$gt":new Date(filter.lastUpdate)} 
          delete filter.lastUpdate
        }
        if(filter.lastId){
          const id = new Types.ObjectId(filter.lastId);
          filter._Id=id //{"$gt":new Types.ObjectId(filterlastId)} 
          delete filter.lastId
        }
        if(filter.wh && Array.isArray(filter.wh)){
         // filter.wh={$in:filter.wh} 
         delete filter.wh
        }
        
        return filter
      }

  
}

/* 
import { IJournalStockItem } from '../../models/mongodb/JournalStockItem.mongo.model';
import { IJournalStock } from '../../models/mongodb/JournalStock.mongo.model'
import mongo from './mongodb.controller'
import JournalStock from './JournalStock.mongo.controller'


import {

    JournalStockItemModel,
   // ProductModel,
   // SyncDataModel
} from '../../models/mongodb'

export const  getWhAisleAsDate =async (
    wh:string,
    aisle:string,
    asDate:Date)=>{

    let journalStockRecord:IJournalStock[]=[]
    let journalStockItemRecord:IJournalStockItem[]=[]

    journalStockRecord= await JournalStock.getWhAisleAsDate(wh,aisle,asDate);
    if (journalStockRecord.length>0)
        journalStockItemRecord= await getRefId(journalStockRecord[0]._id);




    return journalStockItemRecord;

}
export const getLastUpdate=async (wh:string[],lastUpdate:Date) => {

    let journalStockItemRecord:IJournalStockItem[]=[]

    
    journalStockItemRecord= await mongo.get(JournalStockItemModel,{
        wh:{$in:wh}, 
        modifiedDate: {$gt: lastUpdate} 
    });


    return journalStockItemRecord;


}

export const getRefId=async (refId:string) => {

    let journalStockItemRecord:IJournalStockItem[]=[]


    journalStockItemRecord= await mongo.get(JournalStockItemModel,{refId});


    return journalStockItemRecord;

}

export const postMany =async (journalStockItem:Partial<IJournalStockItem>[]) =>{
    
    return await mongo.post(JournalStockItemModel,journalStockItem,true)
} 
export const post =async (journalStockItem:IJournalStockItem) =>{
    
    return await mongo.post(JournalStockItemModel,journalStockItem,true)
} 

export const patch =async (_id:string,journalStockItem:IJournalStockItem) =>{
    
    return await mongo.patch(JournalStockItemModel,{_id},journalStockItem)
} 

export default {
    getLastUpdate,
    getWhAisleAsDate,
    getRefId,
    postMany,
    post
} */