import JournalStockItemMongoController from "./controllers/JournalStockItem.mongo.controller"

 

export default async () =>{
  let data =await (new JournalStockItemMongoController()).get();

}