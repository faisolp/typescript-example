import { IJobDesc } from "./IJobDesc"
import { IJobSpec } from "./IJobSpec"

export interface IJob {

        id: string,
        companyId: string,
        jobHeader: string,
        jobInfo: string,
        jobDetails: string,
        jobPerson: number,


        jobSpecs: IJobSpec[],
        jobDescs: IJobDesc[],
        jobSalary: string,
        status : string,
        jobPublish: Date,
        welFares : string[],
        companyAddress : string


}
export const initJob = ()=>{
        let defaultData: IJob = {
                id: "",
                companyId: "",
                jobHeader: "",
                jobInfo: "",
                jobDetails : "",
                jobPerson: 0,
                status : "", 
                jobSpecs: [], 
                jobDescs: [],
                jobSalary: "",
                jobPublish: new Date(),
                welFares : [],
                companyAddress : ""
                
        }
        return defaultData

}

