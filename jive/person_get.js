var request = require('request');

module.exports = function(){

    this.id = "jive-person-get";
    this.label = "Get Person by Email";
    this.input = {
        "title": "Get Person by Email",
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
            "email": {
                "type": "string",
                "title": "Email",
                "minLength": 1,
                "description": "Enter email address"
            }
        }
    };

    this.help = "Service to get specified person of given email in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "object",
                "properties": {
                    "formatted": {
                        "title": "formatted",
                        "type": "string"
                    },
                    "familyName": {
                        "title": "familyName",
                        "type": "string"
                    },
                    "givenName": {
                        "title": "givenName",
                        "type": "string"
                    }
                }
            },
            "type": {
                "title": "type",
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

        

        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url + "/api/core/v3/people/email/" + input.email + "?fields=name",
            auth: {
                username: input.username,
                password: input.password
            },
            gzip:true
        }, function(err, res, body){
            console.log(res.statusCode,body)
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                 if(typeof(body) == 'string'){
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", "");  // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                delete body.resources;
                return output(null , body);
            }
            return output(body);
        })
    }
};