var request = require('request');

module.exports = function(){

    this.id = "jive-stream-association-create";
    this.label = "Create Stream Association";
    this.input = {
        "title": "Create Stream Association",
        "type": "object",
        "properties": {
            "site_url": {
                "type": "string",
                "title": "Site URL",
                "minLength": 1,
                "description": "Enter your site URL for Jive portal, eg. 'https://company-team.jiveon.com'"
            },
            "username": {
                "type": "string",
                "title": "Username",
                "minLength": 1,
                "description": "Enter the username of your Jive portal"
            },
            "password": {
                "type": "string",
                "title": " Password",
                "format": "password",
                "minLength": 1,
                "description": "Enter the password of your Jive portal"
            },
            "stream_id": {
                "type": "string",
                "title": "Stream ID",
                "minLength": 1,
                "description": "Enter stream ID"
            },
            "URIs": {
                "type": "array",
                "title": "URIs",
                "items": {
                    "type": "string",
                    "minLength": 1,
                    "default": ""
                },
                "minItems": 1,
                "description": "Array of URIs of the objects to be associated. Limit the number of URIs per call to 200"
            }
        }
    };

    this.help = "Service to create new stream's association in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string"
            }
        }
    };

    this.execute = function(input, output) {

        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        }
        console.log("URIs:"+input.URIs[0])

        request({
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/streams/"+input.stream_id+"/associations",
            auth: {
                username: input.username,
                password: input.password
            },
            body: input.URIs
        }, function(err, res, body){
            console.log(res.statusCode,body)
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};