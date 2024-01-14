import { MongoAdepter } from "./adepter/MongoDB"
import { IJob } from "./models/interface/IJob"
import jobModel from "./models/mongodb/Job"
//import { JournalStockItemModel } from "./models/mongodb"

export default async () =>{
    let conn  = new MongoAdepter()
    let db =conn.Conn()
    if(db) {
        //console.log(jobModel,jobModel.modelName)
        let stream= await db.model(jobModel.modelName,jobModel.schema)
        .find()
        .limit(10)
        .exec();
        console.log("stream")
    }
}