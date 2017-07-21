var router = express.Router();
var services = require('./app/controller/services');

router.route('/getData')
    .get(services.cfrData)
router.post('/camera', services.camDetails);
router.ws('/details', services.socketConn);
    



  


module.exports=router