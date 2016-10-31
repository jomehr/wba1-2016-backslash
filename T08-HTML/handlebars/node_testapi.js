var mysql      = require('mysql');
var SQL = mysql.createConnection({
  host     : 'exo.ovh',
  user     : 'bot',
  password : 'SWzZ4vJCXFEI6DfC25dE',
  database : 'wetradingbois'
});

SQL.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return 1;
  } else {
    console.log('connected as id ' + SQL.threadId);

  }
});


//SOCKET Setup
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function(req, res){
  var query=req.query;
  if(query.id === undefined || query.id.length===0) {
    res.send("Please Insert ID & INFOS");
  } else if (query.id.length<=1) {
    SQL.query("Select * from quizz"+query.id+"",function(err,row){
      var waowobject= {
        Frage: row[0].value,
        Antwort1: row[1].value,
        Antwort2: row[2].value,
        Antwort3: row[3].value,
        Antwort4: row[4].value,
        Richtig: row[5].value
      };
    console.log("DATA SEND!");
    res.send(waowobject);

    });
  }


});


http.listen(13337, function(){
  console.log('listening on *:13337');
});
// SOCKET Ende
