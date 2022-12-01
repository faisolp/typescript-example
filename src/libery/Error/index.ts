export const ErrorMessage =(e:any)=>{
    if (typeof e === "string") {
        return e.toUpperCase() // works, `e` narrowed to string
    } else if (e instanceof Error) {
        return String(e.message) // works, `e` narrowed to Error
    }
    return ""
}