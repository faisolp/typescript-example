export default {

  sequelizeConfig:{
      authApi:"http://uatauth.eppcup.com",
	  mssql_axdb:{
		addr: 'mssql://muser:ITmobilesql1835246t@172.18.0.16/EPPAX4',
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
	user: "EPPAXAdmin",
	pass:"A+@1835246()x%",
  },
  mongoConfig:{
	        
		Uri:"mongodb://admin_invtdb:EPP%40iot480%28%29%25@172.18.0.103/invtdb",
		options : {
			user: 'admin_invtdb',
			pass: 'EPP@iot480()%'
		  }
  },
  AUTH:true,
  appConfig:{
		appId:"invt",
  },
  sessionSecret:'e7beb04adffceda29dde683ddda016493dbb097fdf452dcb7a5391eae884bf6e88c58244b32cc0a7b673d3013034b008b4211567bbf0ed4a3c5e304a6c53de10',
}