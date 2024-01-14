
import axios from 'axios';
import  { buildClientSchema, getIntrospectionQuery, printSchema }  from 'graphql';
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVwcGFkbWluIiwicnVsZSI6IkFkbWluIiwiYXBwSWQiOlsiYXhxcmFwaHFsIl0sInVzZXJUeXBlIjoiSW50ZXJuYWwiLCJpYXQiOjE3MDUyMDI1OTF9.yaJ5DsK-n4Q1QNQT0RfOHQKTO3elXBbVqneLFpG4ego"


const ProdTablesQueryGraphGL = `
query GetProdTableById($prodId: String!) {
  getProdTableById(prodId: $prodId) {
      prodId
      itemId
      name
      InventDim {
          configId
          inventSizeId
          inventColorId
      }
      EPI_QC_ParamItemTable {
          paramId
          companyCode
          compGroup
          custRelation
          cusCode
          InventDim {
              configId
              inventSizeId
              inventColorId
          }
          EPI_QC_ParamVariableTable {
              variableId
              variable
              normal
              unit
              sigma
              pointTest
              samplingTestQty
              EPI_QC_ParamULTable {
                  limitID
                  name
                  limit
                  ul
                  ll
              }
          }
      }
  }
}

`;
const GraphQLHost ='http://172.18.0.155:3091/api/v1/graphql'
//'http://localhost:3000/api/v1/graphql' //'http://172.18.0.155:3091/api/graphql'
//'http://localhost:3000/api/graphql'
const fetchGraphQLData=async(token:string, query: string, variables?: Record<string, any>) =>{
  const axios_config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
   /* let  query= getIntrospectionQuery() ;
    console.log("getIntrospectionQuery",query) 
    const response_schema = await axios.post(GraphQLHost, { 
      query
    },axios_config);
    const schema = buildClientSchema(response_schema.data.data)
    const sdl = printSchema(schema)
    console.log("schema",sdl)
*/
    const response = await axios.post(GraphQLHost, {
      query,
      variables,
    },axios_config);
    

    return response.data;
  } catch (error) {
    console.error('Error fetching GraphQL data:', error);
    throw error;
  }
}



async function app() {
    try {
        const data = await fetchGraphQLData(
          TOKEN,
          ProdTablesQueryGraphGL,
          {prodId:"PF0208732"}
        );
        console.log('Data received from GraphQL:', data);
  
      console.log(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
export default app