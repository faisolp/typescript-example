import JSONSafe from "../JSONSafe";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";


export type TQuery= Partial<{[key: string]: string | string[];}>;
const listString =[
  "inventLocationId",
  "wh",
  "aisle",
  "aisleId",
  "batchId",
  "palletId",
  "itemId"
];

export const query2List =(query:TQuery) =>{
    let ret:any={}
    Object.entries(query).forEach(item => {
        const [key, value] = item;
        var regNumber = /^\d+$/;
        switch (true){
          case value==='true' || value==='false' : //boolean
              ret[key]=Boolean(value)
              break;
          case Boolean(Date.parse(value as string )) && !regNumber.test(value as string) :  //date
              ret[key]=new Date(value as string )
              break;
          case Array.isArray(value):  //Array
              ret[key]=value
              break;
         
          case typeof(value)=='string'&&( //Not JON
               (!value.startsWith("{") || 
               !value.endsWith("}")) &&
               (!value.startsWith("[")|| 
               !value.endsWith("]"))) && 
               listString.includes(key):  
              ret[key]=value
              break;
              
          default : //string
              ret[key]=JSONSafe.parse(value as string) //string/By JSON Type
              break;
          }
        
        //console.log(key, value);
      });
    return ret
   
}

export const CopyObj =(objFrom:any,objTo:any) =>{
  //let ret:any={}
  Object.entries(objFrom).forEach(itemFrom => {
      const [keyFrom, valueFrom] = itemFrom;
      Object.entries(objFrom).forEach(itemTo => {
        const [keyTo, valueTo] = itemFrom;
        if(keyFrom===keyTo)
          objTo[keyTo]=objFrom[keyFrom]
      });
      
      //console.log(key, value);
    });
  return objTo
 

}



export const addapi=(api_command:string,addcomm:string,check:any)=> {
  
    if(check)
        api_command+=(api_command.indexOf("?")>-1 ?"&":"?")+addcomm;
    return api_command;
} 
export const ToUrlParm  =(pram:any={})=>{
  let api_command:string=""
  Object.entries(pram).forEach(item => {
    const [key, value] = item;
    let _value
    switch (true){
      case value==='true' || value==='false' : //boolean
        _value=String(value)
        break;
      case  (value instanceof Date):  //date
        _value=dayjs(value as Date).format("YYYY-MM-DDTHH:mm:ssZ[Z]")
        break;
      case Array.isArray(value):  //Array
      default : //string
        _value=JSONSafe.stringify(value) //string/By JSON Type
        
    }
    api_command+=`${api_command.length>0 ?"&":"?"}${key}=${_value}`;

  })
  return api_command;
}


export const returnDataAPI =<T = any>(ret:AxiosResponse<any>)=>{
    let dataReturn: AxiosResponse<T>=ret;
    
    if(ret.data){
      dataReturn.status=ret.data.status ? ret.data.status : ret.status;
      dataReturn.statusText=ret.data.statusText?ret.data.statusText: ret.statusText;
      dataReturn.data=ret.data.data?ret.data.data: ret.data;
      
      
    } else {
      
      dataReturn.status= ret.status;
      dataReturn.statusText= ret.statusText;
      dataReturn.data=ret.data;
       
    }
    return dataReturn;
    
  }
