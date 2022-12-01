import dayjs from "dayjs";
import { IUser } from "../../models/interface/IUser";

const  CryptoJS = require("crypto-js");
export const getAuth =(token:string,key:string) =>{
    
    try {
        let bytes  = CryptoJS.AES.decrypt(token,key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as IUser;

    }catch(e){
        console.log(dayjs().format("YYYY-MM-DDTHH:mm:ss"), e);
    
    }
    return null;
}