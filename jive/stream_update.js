var request = require('request');

module.exports = function(){

    this.id = "jive-stream-update";
    this.label = "Update Stream";
    this.input = {
        "title": "Update Stream",
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
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "description": "Name of this custom stream to update. It must be unique (per user)"
            }
        }
    };

    this.help = "Service to retrive stream details";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
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
            "updated": {
                "title": "updated",
                "type": "string"
            },
            "count": {
                "title": "viewCount",
                "type": "number"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "source": {
                "title": "source",
                "type": "string"
            },
            "person": {
                "title": "person",
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
        }

        request({
            method :'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/streams/"+ input.stream_id,
            auth: {
                username: input.username,
                password: input.password
            },
            json: {
                "type": "stream",
                "source": 'custom',
                "name": input.name
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", "");  // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};