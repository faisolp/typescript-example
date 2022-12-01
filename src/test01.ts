import JournalStockItemMongoController from "./controllers/JournalStockItem.mongo.controller"
import { Types } from "mongoose";
const {ObjectId}  =Types 

export default async () =>{
  let data =await (new JournalStockItemMongoController()).get({_id:{$gt:new ObjectId("6383194df86bd71ecd947ff1")}},{},{},10);
  console.log('====================================');
  console.log(" data", data);
  console.log('====================================');

}