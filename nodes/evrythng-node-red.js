module.exports = function(RED) {
  var EVT = require("evrythng");
  function thngNode(config) {
    RED.nodes.createNode(this,config);
    this.on('input', function(msg) {
      var node = this;
      var util = require('util');

      /* override the key, value and thng in from the config if the payload provided */
      var key = (msg && msg.payload && msg.payload.key) ? msg.payload.key : config.property;
      var value = (msg && msg.payload && msg.payload.value) ? msg.payload.value : config.propertyValue;
      var thng = (msg && msg.payload && msg.payload.thng) ? msg.payload.thng : config.thng;

      var propUri = "/thngs/" + thng + "/properties";
      var options = {
        url: propUri,
        method : config.method,
        authorization: config.key,
        success: function(data){
          node.log(util.inspect(data));
          msg.payload = data;
          node.send(msg);
        },
        error: function(err){
          node.log(err);
          msg.payload = err;
          node.send(err);
        }
      };


      // PUT requests will have a payload
      node.log("Requesting " + config.method.toUpperCase() + " " + propUri);
      if(config.method === 'put') {
        var payload = convertToType(value);
        options.data = [{"key" : key, "value" : payload }];
        node.log("With property value " + util.inspect(options.data));
      }
      EVT.api(options);
    });
  }

  function convertToType(string) {
    try {
      return JSON.parse(string);
    } catch(e) {
      return string;
    }
  }

  RED.nodes.registerType('evrythng',thngNode);
};
