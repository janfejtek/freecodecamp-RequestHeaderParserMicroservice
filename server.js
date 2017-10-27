var express = require('express');
var app = express();



app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.set('trust proxy', true);

app.get("/api/whoami", function (request, response) {
  var data = {};
  data['ip'] = request.ips[0];
  
  var foundSystem = request.headers['user-agent'].match(/\(([^)]*?)\)/);
  
  
  data['system'] = (foundSystem != null) ? foundSystem[1] : null;
  var foundLanguages = request.acceptsLanguages();
  data['language'] = (foundLanguages.length > 0) ? foundLanguages[0] : null;
  
  response.send(data);
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
