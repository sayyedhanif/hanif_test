var request = require('request');

module.exports = function(){

    this.id = "jive-action-create";
    this.label = "Create Action";
    this.input = {
        "title": "Create Action",
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
            "title": {
                "type": "string",
                "title": "Title",
                "minLength": 1,
                "description": "Enter the title of this inbox entry"
            },
            "content": {
                "type": "string",
                "title": "Contents",
                "minLength": 1,
                "description": "Enter the contents of this inbox entry"
            },
            "deliverTo": {
                "type": "array",
                "title": "Person URI's",
                "items": {
                    "type": "string",
                    "minLength": 1,
                    "default": ""
                },
                "minItems": 1,
                "description": "Valid list of Person URI's, for eg. https://example.jiveon.com/api/core/v3/people/1234"
            }
        }
    };

    this.help = "Service to create new activity in Jive portal";

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
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+"/api/core/v3/activities",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "title": input.title,
                "content": input.content,
                "openSocial": { 
                    "deliverTo": input.deliverTo
                }
            },
            gzip: true
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                console.log(err, res.statusCode, body)
                if(typeof(body) == 'string'){                   
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};