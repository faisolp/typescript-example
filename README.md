
https://www.digitalocean.com/community/tutorials/typescript-new-project


yarn init
yarn add  -D typescript ts-node 
npx tsc --init

create file  tsconfig.json
{
  "compilerOptions": {
    /* Enable incremental compilation */
    "target": "esnext",                               
    /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",                           
    /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["es2019"],                              
    /* Specify library files to be included in the compilation. */
    /* Concatenate and emit output to single file. */
    
    "outDir": "./dist",                              
    /* Redirect output structure to the directory. */
    //"outFile": "./dist/index.js",
    "rootDir": "./",                               
    /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    
    "strict": true,                                 
    /* Enable all strict type-checking options. */
    "noImplicitAny": true,                         
    /* Raise error on expressions and declarations with an implied 'any' type. */
    "esModuleInterop": true,                        
    /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        
    /* Disallow inconsistently-cased references to the same file. */
  }
}

create file  index.ts  (typescript-project/index.ts)
const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
hello()