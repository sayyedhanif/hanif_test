var request = require('request');

module.exports = function(){

    this.id = "jive-stream-association-get";
    this.label = "Get Stream Association";
    this.input = {
        "title": "Get Stream Association",
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
            "objectID": {
                "type": "string",
                "title": "Object ID",
                "minLength": 1,
                "description": "Enter object ID"
            },
            "objectType": {
                "type": "string",
                "title": "Object Type",
                "enum" : ["discussion", "document", "group","message", "post", "project","space","task"],
                "minLength": 1,
                "description": "Enter object type"
            },
        }
    };

    this.help = "Service to get specified stream's association in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "associatable": {
                "title": "associatable",
                "type": "boolean"
            },
            "content": {
                "title": "content",
                "type": "boolean"
            },
            "place": {
                "title": "place",
                "type": "boolean"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "objectType": {
                "title": "objectType",
                "type": "number"
            },
            "since": {
                "title": "since",
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
            url: input.site_url + "/api/core/v3/streams/" + input.stream_id + "/associations/" + input.objectType + "/" +input.objectID,
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
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};