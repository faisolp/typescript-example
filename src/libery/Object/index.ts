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