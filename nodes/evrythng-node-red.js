module.exports = function(RED) {
	var EVT = require("evrythng");
	function thngNode(config) {
		RED.nodes.createNode(this,config);
		var evrythngBaseUrl = "https://api.evrythng.com";
		//var propUri = "/thngs/" + config.thng + "/properties/" + config.property;
		var propUri = "/thngs/" + config.thng + "/properties";
		var fullUrl = evrythngBaseUrl + propUri;
		this.on('input', function(msg) {
			var node = this;
			var util = require('util');
			
			/* override the key and value and thing with the payload if entered */
			var key = (msg && msg.payload && msg.payload.key) ? msg.payload.key : config.property;
			var value = (msg && msg.payload && msg.payload.value) ? msg.payload.value : config.value;
			var thng = (msg && msg.payload && msg.payload.thng) ? msg.payload.thng : config.thng;

			var propUri = "/thngs/" + thng + "/properties";
			var fullUrl = evrythngBaseUrl + propUri;
			
			
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
				options.data = [{"key" : key, "value" : value }];
				node.log("With property value " + util.inspect(options.data));
			}
			EVT.api(options);
		});
	}
	RED.nodes.registerType('evrythng',thngNode);
}
