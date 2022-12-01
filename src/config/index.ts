import production from "./env/production"
import development from "./env/development"

const config  = development
//false//process.env.NODE_ENV==="production"
              //`? production : development

export default config