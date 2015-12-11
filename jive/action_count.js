var request = require('request');

module.exports = function(){

    this.id = "jive-actions-counts-get";
    this.label = "Get Actions Count";
    this.input = {
        "title": "Get Actions Count",
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
            }
        }
    };

    this.help = "Return counting information about the actions of the person making the request";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "pending": {
                "title": "pending",
                "type": "number"
            },
            "tasks": {
                "title": "tasks",
                "type": "number"
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
            url: input.site_url+"/api/core/v3/actions/counts",
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
                return output(null , body);
            }
            return output(body);
        })
    }
};