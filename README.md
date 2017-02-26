EVRYTHNG Node-RED
=================

A simple Node-RED node that performs read or write requests on a Property of a Thng with the [EVRYTHNG](https://developers.evrythng.com) IoT Platform (free developers accounts!).

# Install

To install the module, you can either install it locally within your node-RED user data directory (by default, `$HOME/.node-red`):

```
cd $HOME/.node-red
npm install npm install node-red-contrib-evrythng
```

or globally alongside Node-RED:

```
sudo npm install -g node-red-contrib-evrythng
```

# Usage

You can send a payload to the node including Thng, key and value to update the Property of an existing Thng.
Alternatively, you can set the Thng, key and value in the node configuration.
The node sends a message to: `https://api.evrythng.com/thngs/<msg.payload.thng>/properties`
And the payload that is sent ends up in the format:

```
[{
  "key" : <code>msg.payload.key</code>,
  "value" : <code>msg.payload.value</code>
}]
```


