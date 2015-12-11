var request = require('request');

module.exports = function(){

    this.id = "jive-stream-create";
    this.label = "Create a Person Stream";
    this.input = {
        "title": "Create a Person Stream",
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
            "person_id": {
                "type": "string",
                "title": "Person ID",
                "minLength": 1,
                "description": "Enter a person/user ID"
            },
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "description": "Name of this custom stream. It must be unique (per user)"
            }
        }
    };

    this.help = "Service to create new custom stream in Jive portal for particular person";

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
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/people/"+input.person_id+"/streams",
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
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};