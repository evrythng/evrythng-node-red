module.exports = function(RED) {
	var EVT = require("evrythng");
	function thngNode(config) {
		RED.nodes.createNode(this,config);
		var evrythngBaseUrl = "https://api.evrythng.com";
		var propUri = "/thngs/" + config.thng + "/properties/" + config.property;
		var fullUrl = evrythngBaseUrl + propUri;
		this.on('input', function(msg) {
			var node = this;
			var util = require('util');
			
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
			}

			// PUT requests will have a payload
			node.log("Requesting " + config.method.toUpperCase() + " " + propUri);	
			if(config.method === 'put') {
				options.data = [{"value" : config.propertyValue}];
				node.log("With property value " + util.inspect(options.data));
			}
			EVT.api(options);
		});
	}
	RED.nodes.registerType('evrythng',thngNode);
}
