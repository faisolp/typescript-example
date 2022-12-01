export const stringify =(obj:any)=> {
    try {
        return JSON.stringify(obj)
    }catch(e){
        
        return ""
    } 
}

export const parse =(str:string)=> {
    try {
        return JSON.parse(str)
    }catch(e){
        
        return str
    } 
}

export default {
    stringify,
    parse
}