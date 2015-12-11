var request = require('request');

module.exports = function(){

    this.id = "jive-action-get";
    this.label = "Get Action";
    this.input = {
        "title": "Get Action",
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
            "action_id": {
                "type": "string",
                "title": "Action ID",
                "minLength": 1,
                "description": "Enter the action ID"
            }
        }
    };

    this.help = "Service to get  action's details in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string"
            },
            "url": {
                "title": "url",
                "type": "string"
            },
            "type": {
                "title": "type",
                "type": "string"
            },
            "published": {
                "title": "published",
                "type": "string"
            },
            "title": {
                "title": "title",
                "type": "string"
            },
            "content": {
                "title": "content",
                "type": "object"
            },
            "verb": {
                "title": "verb",
                "type": "string"
            },                        
            "actor": {
                "title": "actor",
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "string"
                    },
                    "displayName": {
                        "title": "displayName",
                        "type": "string"
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+"/api/core/v3/actions/"+ input.action_id,
            auth: {
                username: input.username,
                password: input.password
            },
            gzip: true
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                console.log(err, res.statusCode, body)
                if(typeof(body) == 'string'){
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", "");  // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                body.url = body.id;
                body.id = body.id.replace(input.site_url+"/api/core/v3/actions/", "");
                body.content = body.content ? body.content : "null";
                body.title = body.title ? body.title : "null";
                return output(null , body);
            }
            return output(body);
        })
    }
};