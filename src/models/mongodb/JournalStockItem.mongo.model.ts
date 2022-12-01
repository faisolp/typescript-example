import { Schema, model,Types ,ObjectId} from 'mongoose';
import IMongoData from '../interface/IMongoData'
// 1. Create an interface representing a document in MongoDB.
/**
 
    journalId:"0001",
    itemId:"ถ้วย 24 Oz.",
    WH:"RW",
    batch:"220102005",
    locationId:"01-01-02",
    zoon:"01",
    qty:15,
    lineNum:3,
    basePalate:14,
 */
export interface IJournalStockItem extends IMongoData{
  //_id: ObjectId,
  //_id:string
  refId:string;
  //journalId: string;
  wh: string;
  batchId?: string;
  aisle: string;
  locationId: string;
  itemId: string;
  //itemName: string;
  //itemDimId: string;
  configId: string;
  sizeId: string;
  colorId: string;
  palletId?:string;
  serialId?:string;
  //basePalate:number;
  //qtyPerPalate:number;
  qty:number;
  qtyDP:number;
  counting?:number;
  createdDate: Date;
  modifiedDate: Date;
  
}
// 2. Create a Schema corresponding to the document interface.
const journalStockItemSchema = new Schema<IJournalStockItem>({
  //_id: { type: String,required: true,index: true },
  refId: { type: String, ref:"journalstock" ,index: true  },
  //journalId:  String,
  wh: String,
  batchId: String,
  aisle: String,
  locationId: { type: String, index: true  },
  itemId: String,
  palletId:String,
  serialId:String,
  //itemName: String,
  //itemDimId: String,
  configId: String,
  sizeId: String,
  colorId: String,
  //basePalate:Number,
  //qtyPerPalate:Number,
  qty:Number,
  qtyDP:Number,
  counting:Number,
  createdDate:{ type: Date},
  modifiedDate:{ type: Date},
  
});

journalStockItemSchema.index({ 
  refId:1,
  wh:1,
  locationId: 1, 
  palletId:1,
  itemId:1,
  configId:1,
  sizeId:1,
  colorId:1,
  batchId:1,
  serialId:1,

});    //---Index----
// 3. Create a Model.
const journalStockItemModel=model<IJournalStockItem>('journalstockitem', journalStockItemSchema)


export default journalStockItemModel