import dayjs from "dayjs";
import { IUser } from "../../interface/IUser";
import CryptoJS from "crypto-js"

//const  CryptoJS = require("crypto-js");
export const genAuthToken =(data:any={},key:string) =>{
    
    try {
        let _data  = CryptoJS.AES.encrypt(JSON.stringify(data),key);
        
        return _data
    }catch(e){
        console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
    
    }
    return null;
}