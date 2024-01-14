export default ()=>{
    interface IData{id:string}
    
    let data:IData[]=[{id:"aaa"},{id:"aaaa"},{id:"bb"},{id:"c"},{id:"12"},{id:"33"}]
    
    data.sort((a, b) => a.id>b.id ? 1 :(a.id!=b.id?-1:0))
    console.log(data)
    
}