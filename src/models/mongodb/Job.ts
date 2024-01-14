import { Schema, model, Types } from 'mongoose';
import { IJob } from '../interface/IJob';
// import IAttachFile from '../Interface/IAttachFiles';

// 2. Create a Schema corresponding to the document interface.
const jobSchema = new Schema<IJob>({
  //_id : {type:Types.ObjectId}
  id: {type:String , required : true},
  companyId: { type: String ,default:""  , ref : 'companies'},
  jobHeader: { type: String ,default:""},
  jobInfo: { type: String ,default:""},
  jobDetails: { type: String ,default:""},
  jobPerson:{ type: Number ,default:0},

  jobSpecs:  {type : Schema.Types.Mixed  ,  default:[] },
  jobDescs:  {type : Schema.Types.Mixed  ,  default:[] },
  jobSalary: { type: String ,default:""},
  status : { type: String ,default:""},
  jobPublish: { type: Date, default: new Date() },
  welFares : {type : Schema.Types.Mixed  ,  default:[] },
  companyAddress : { type: String ,default:""},



  

  //applyDate : {type : String , default : "" }

  // attachFiles: IAttachFile[]

});

jobSchema.index({id:1,companyId:1})
// 3. Create a Model.
const jobModel = model<IJob>('jobs', jobSchema)

export default jobModel