
https://www.digitalocean.com/community/tutorials/typescript-new-project


yarn init

yarn add  -D typescript ts-node 

npx tsc --init

create file  tsconfig.json

{


  "compilerOptions": {
    
    "target": "esnext",                               
    
    "module": "commonjs",                           
    
    "lib": ["es2019"],                              
    
    
    "outDir": "./dist",                              
    
    //"outFile": "./dist/index.js",
    "rootDir": "./",                               
    
    
    "strict": true,                                 
    
    "noImplicitAny": true,                         
    
    "esModuleInterop": true,                        

    "forceConsistentCasingInFileNames": true        
    
  }
  
}

create file  index.ts  (typescript-project/index.ts)

const world = 'world';

export function hello(who: string = world): string {

  return `Hello ${who}! `;
  
}

hello()
