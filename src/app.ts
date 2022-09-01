import { IUser } from './interface/IUser';
import { genAuthToken } from "./library/auth"

export default ()=>{
    let key="TestKey"
    let _data:IUser={
        user:"Faisolp",
        pass:"12345678",
        

    }
    let token= genAuthToken(_data,key)
    console.log("Token",token?.toString());
    

}