 express = require('express');
var cors = require('cors');

app = express();
var expressWs = require('express-ws')(app);





var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = require('./routes')

app.use(cors());
app.use('/', router);

app.listen(port,()=>{console.log('Server running on port ' + port);});

