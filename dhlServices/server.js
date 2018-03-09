// importar
var express = require('express');
var sql = require('mssql');
var multer = require('multer');
var bodyParser = require('body-parser');
var conf = require('./config')


// configura bd 
var config = conf.Datos;
 
// instanciar
var app = express();
 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// ruteo

//APP_DHL_VALIDA_LOGIN
app.get('/Logea', function(req, res){
    ValidaLog(req,res);
});

function regreso(id,mensaje,res){
	//console.log(id+' - '+mensaje);
	var SendObj = {"Status": id, "Msj": mensaje};
	var stringData = JSON.stringify(SendObj);
		  
	// Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	res.send(stringData);
}

function ValidaLog(req,res){
	var dbConn = new sql.Connection(config); 
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);

		request
		.input ('App','1')
		.input ('Usuario',req.query.Usuario)
		.input ('Password',req.query.Password)
        .execute("APP_DHL_VALIDA_LOGIN").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0][0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
			regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
}

//APP_DHL_GET_VIN
app.get('/BuscarVin', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("APP_DHL_GET_VIN").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0][0]);
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
});

//APP_DHL_GET_DOCTOS
app.get('/BuscarDoctos', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("APP_DHL_GET_DOCTOS").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0][0]);
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
});


//APP_DHL_GUARDA
app.post('/Guarda',function(req, res){
	
	var dbConn = new sql.Connection(config); 
	var respuestaM = [];
	dbConn.connect().then(function () {

		res.contentType('application/json');
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		var bErr =false;
		for(var i=0; i<req.body.Doctos.length; i++){
			var request = new sql.Request(dbConn);
			request
			.input ('DoctoId',req.body.Doctos[i].DoctoId)
			.input ('ArchivoId',req.body.Doctos[i].ArchivoId)
			.input ('Vin',req.body.Vin)
			.execute("APP_DHL_GUARDA").then(function (recordSet) {
			}).catch(function (err) {
				console.log(err.message);
			});
		}

		var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.body.Vin)
		.execute("APP_DHL_GET_VIN").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0][0]);
			res.send(msj);
			dbConn.close();
		}).catch(function (err) {
			console.log(err.message);
			res.send(JSON.stringify({"status": "False", "Msj": err.message}));
			dbConn.close();
		});
    }).catch(function (err) {
		dbConn.close();
		res.send(JSON.stringify({"status": "False", "Msj": err.mensaje}));
    });
});

let UPLOAD_PATH = './uploads/';
var nombreFisico = '';
 
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('destino');
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        console.log('carga de archivo');
		var datetimestamp = Date.now();
		nombreFisico = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, nombreFisico);
    }
})
let upload = multer({ storage: storage })

app.post('/cargaimagen', upload.single('image'), (req, res, next) => {
	var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.input ('DoctoId',req.query.DoctoId)
		.input('Extencion',req.query.Extencion)
		.input('nombreFisico',nombreFisico)
		.execute("APP_DHL_GUARDADOCTO_APPDHL").then(function (recordSet) {
			//var msj = JSON.stringify();
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			console.log(recordSet[0][0].ArchivoId);
			res.send(recordSet[0][0].ArchivoId);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
    
});

app.get('/instrucciones', function (req, res) {

    let respuesta = { imagen: true };

    switch (req.query.tipoDocumento) {
        case "1":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/placa.jpg';
        case "2":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/placa.jpg';
            break;
        case "3":
            respuesta.imagen = false;
            respuesta.valor = ['Foto de cabina completa con la puerta del conductor abierta'];
            break;
        case "4":
            respuesta.imagen = false;
            respuesta.valor = ['Dar vuelta a la llave del switch para que encienda el tablero y entonces tomar la foto']
            break;
        case "5":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/motor.jpg';
            break;
        case "6":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/circulacion.jpg';
            break;
        case "7":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/verificacion.jpg';
            break;
        case "8":
            respuesta.imagen = false;
            respuesta.valor = ['Únicamente si aplica'];
            break;
        case "9":
            respuesta.imagen = false;
            respuesta.valor = [
                '1. Iniciar video con el celular ',
                '2. Encender la unidad',
                '3. Caminar hacia atrás realizando toma del número económico de la unidad, placa trasera y escape verificando si emite o no humo la unidad, todo sin cortar vídeo hasta finalizar. MAXIMO 30 SEGUNDOS',
				
            ];
            break;
        default:
            respuesta.imagen = false;
            respuesta.valor = [
                '1. Iniciar video con el celular',
                '2. Encender la unidad',
                '3. Realizar los cambios pertinentes en la caja de transmisión para verificar su buen funcionamiento, todo sin cortar vídeo hasta finalizar. MAXIMO 30 SEGUNDOS'
            ];
            break;
    }

	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(respuesta);
});


//ruteo

//WEB_DHL_VALIDA_LOGIN
app.get('/LogInWeb', function(req, res){
	Weblog(req,res);
});

function Weblog(req,res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function(){
		var request = new sql.Request(dbConn);

		request
		.input ('App','2')
		.input ('Usuario', req.query.Usuario)
		.input ('Password',req.query.Password)
		.execute("WEB_DHL_VALIDA_LOGIN").then(function(recordSet){
			var msj = recordSet[0][0];
		
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//	console.log(msj);
			if(msj){
				// Busca permisos por columna
				var request2 = new sql.Request(dbConn);
				request2
				.input ('App','2')
				.input ('Usuario', req.query.Usuario)
				.input ('Password',req.query.Password)
				.execute("WEB_DHL_VALIDA_LOGIN_PER").then(function(recordSet){
					msj.permisos = recordSet[0];
					dbConn.close();
					res.send(msj);
				}).catch(function (err) {
					dbConn.close();
					regreso('false',err.message,res);
				});
			}else{
				dbConn.close();
				regreso('false',"No coinciden datos ",res);
			}
			
			//res.send(msj);
        }).catch(function (err) {
           dbConn.close();
			regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
}

app.get('/BuscaComen', function(req, res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		 request
		 .input ('idUnidad',req.query.idUnidad)
		 .execute("WEB_DHL_GET_COMUNIDAD").then(function (recordSet) {
			 var msj = JSON.stringify(recordSet[0]);
			 
			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			 res.send(msj);
		}).catch(function (err) {
		   dbConn.close();
			regreso('false',err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('false',err.message,res);
	});
 });


 function _Evidencia()
 {
	this.ArchivoId;
	this.id;
	this.titulo;
	this.imagen;
	this.ext;
 }

 app.get('/Get_Evidencia', function(req, res){
	var dbConn = new sql.Connection(config);
	var Evidencias = []
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		 request
		 .input ('idUnidad',req.query.idUnidad)
		 .execute("WEB_DHL_GET_EVIDENCIAS").then(function (recordSet) {
			
			 for(var i=0; recordSet[0].length>i ; i++){
				var Evidencia = new _Evidencia();
				Evidencia.ArchivoId = recordSet[0][i].Cat_ArchivoId;
				Evidencia.id = i+1;
				Evidencia.titulo = recordSet[0][i].Docto;
				Evidencia.imagen = conf.UrlDoctos+recordSet[0][i].Ruta.split('/')[recordSet[0][i].Ruta.split('/').length -1];
				Evidencia.ext = recordSet[0][i].Extencion;
				Evidencias.push(Evidencia);
			 }


			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			 res.send(JSON.stringify(Evidencias));
		}).catch(function (err) {
		   dbConn.close();
			regreso('false',err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('false',err.message,res);
	});
 });
//WEB_DHL_GET_VIN
app.get('/BuscarUni', function(req,res){
	var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("WEB_DHL_GET_VIN").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0][0]);
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
});

//WEB_DHL_GET_UNIDADES
app.get('/Get_All', function(req,res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request
        .execute("WEB_DHL_GET_UNIDADES").then(function (recordSet) {
            var msj = JSON.stringify(recordSet[0]);
            
            dbConn.close();
            res.contentType('application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
            res.send(msj);
        }).catch(function (err) {
           dbConn.close();
           regreso('false',err.message,res);
        });
    }).catch(function (err) {
        dbConn.close();
        regreso('false',err.message,res);
    });
});


app.get('/InsertaCom',function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request
        .input ('Comentario',req.query.Comentario)
        .input ('UsuarioId',req.query.UsuarioId)
        .input('idUnidad', req.query.UnidadID) 
        .execute("[WEB_DHL_INS_COM]").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		 res.send({resp:msj});
	   }).catch(function (err) {
		  dbConn.close();
		   regreso('0','Err1:'+err.message,res);
	   });
   }).catch(function (err) {
		dbConn.close();
		regreso('0','Err2:'+err.message,res);
   });
});

////GET COTIZACIONXUNIDAD
app.get('/BuscarCoti', function(req,res){
	var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idUnidad',req.query.idUnidad)
		.execute("[WEB_DHL_GET_COTIZACION]").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0]);
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
});

app.get('/deleteCoti',function(req, res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		request
		.input ('idPartida',req.query.idPartida)
		.execute("WEB_DHL_DEL_COT").then(function (recordSet) {
			 var msj = JSON.stringify(recordSet[0][0]);
			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			  res.send(msj);
		}).catch(function (err) {
		   dbConn.close();
			regreso('0','Err1:'+err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('0','Err2:'+err.message,res);
	});
 });

 app.get('/InsertCoti',function(req, res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		request
		.input ('Partida',req.query.Partida)
		.input ('Cantidad',req.query.Cantidad)
		 .input('Precio',req.query.Precio)
		 .input('UsuarioId',req.query.UsuarioId)
		 .input('idUnidad',req.query.idUnidad)
		.execute("[WEB_DHL_INS_COT]").then(function (recordSet) {
			 var msj = JSON.stringify(recordSet[0]);
			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  res.send(msj);
		}).catch(function (err) {
		   dbConn.close();
			regreso('0','Err1:'+err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('0','Err2:'+err.message,res);
	});
 });

 app.get('/GuardaOferta',function(req, res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		request
		.input ('idUsuario',req.query.idUsuario)
		.input ('idUnidad',req.query.idUnidad)
		 .input('monto',req.query.monto)
		 .input('estatus',req.query.estatus)
		.execute("WEB_DHL_GUARDA_OFERTA").then(function (recordSet) {
			 var msj = JSON.stringify(recordSet[0]);
			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  res.send(msj);
		}).catch(function (err) {
		   dbConn.close();
			regreso('0','Err1:'+err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('0','Err2:'+err.message,res);
	});
 });


 app.get('/AprobCoti',function(req, res){
	var dbConn = new sql.Connection(config);
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		request
		.input ('IdUnidad',req.query.IdUnidad)
		.input ('IdAprob',req.query.IdAprob)
		.input ('UsuarioId',req.query.UsuarioId)
		
		.execute("WEB_DHL_APROB_COT").then(function (recordSet) {
			 var msj = JSON.stringify(recordSet[0]);
			 dbConn.close();
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  res.send(msj);
		}).catch(function (err) {
		   dbConn.close();
			regreso('0','Err1:'+err.message,res);
		});
	}).catch(function (err) {
		 dbConn.close();
		 regreso('0','Err2:'+err.message,res);
	});
 });
  
// escuchar
app.listen(4850);
console.log("Servidor Desflote 0.0.2 en el puerto 4850");