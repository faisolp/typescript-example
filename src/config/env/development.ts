export default  {
    
    authApi:"http://uatauth.eppcup.com",
	sequelizeConfig:{
		mssql_axdb:{
	
		  host:'172.18.0.16',
		  dbname:'EPPAX4',
		  addr: '',
		  token:"U2FsdGVkX19RSE5YC2jWAtN+a9/zxPquY6g3vupHE5fgamrfwKNRmJiBjNLaNtD/Taen6LGHqD9HEfEL5H61QQ==",
		  opts: {
			  define: {
				//prevent sequelize from pluralizing table names
				freezeTableName: true
			  },
			  pool: {
				max: 50,
				min: 0,
				acquire: 30000,
				idle: 10000
			  },
			  logging: false
			},
		},
		

	},
	axConfig:{ 
		url:"http://172.18.2.143:21117/DynamicsAXService.asmx?wsdl",
		user: "",
		pass:"",
		token:"U2FsdGVkX1+IHjr4Nu0JeW7id0IbbHPEKDIFVpbgyUVb8tv1LlfH7LpGEoc2s8MtrqJUw7rReluftTWyCy3NBA=="
	},
	mssqlConfig:{
            user: '',
            password: '',
            database: 'EPPAX4',

            server: '172.18.0.16',
			token:"U2FsdGVkX19XTJwd9MD9qXYjllr9EIVCpyn82/ln3PU/LbkCZSxLeSYPkPRRvNna56ahEGs8s83DwmQFnGGTOQ==",
            pool: {
              max: 10,
              min: 0,
              idleTimeoutMillis: 10000
            },
            options: {
              encrypt: true, // for azure
              trustServerCertificate: true // change to true for local dev / self-signed certs
            }
          
	},
	mssqlDPSPConfig:{
            user: '',
            password: '',
            database: 'EPPAX4DPSP',

            server: '172.18.0.16',
			token:"U2FsdGVkX19XTJwd9MD9qXYjllr9EIVCpyn82/ln3PU/LbkCZSxLeSYPkPRRvNna56ahEGs8s83DwmQFnGGTOQ==",
            pool: {
              max: 10,
              min: 0,
              idleTimeoutMillis: 10000
            },
            options: {
              encrypt: true, // for azure
              trustServerCertificate: true // change to true for local dev / self-signed certs
            }
          
	},

	mongoConfig:{
		database:"invtdb",
		server: '172.18.0.103',
		Uri:"",
		options : {
			user: '',
			pass: '',
			token:'U2FsdGVkX1/T3cp3mQ9rZryykDvhm0CXh5SOhmbNWhpI3lW91iytDhdG6yrASOwb2LZhw3MzG9J7VuT4qz3uMw==',
		  }

	},
	MaxRecord :{
		default:50000,
		journalStock:50000,
		journalStockItem:100000,
		countingTrans:500000,
	},

	AUTH:true,
	appConfig:{
		appId:"invt",
	},
	sessionSecret:'e7beb04adffceda29dde683ddda016493dbb097fdf452dcb7a5391eae884bf6e88c58244b32cc0a7b673d3013034b008b4211567bbf0ed4a3c5e304a6c53de10', 	
}