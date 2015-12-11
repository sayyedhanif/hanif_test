var request = require('request');

module.exports = function(){

    this.id = "jive-stream-delete";
    this.label = "Delete Stream";
    this.input = {
        "title": "Delete Stream",
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
            }
        }
    };

    this.help = "Service to delete stream of given streamID";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "deleted": {
                "title": "deleted",
                "type": "boolean"
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
            method :'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/streams/"+ input.stream_id,
            auth: {
                username: input.username,
                password: input.password
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){                
                return output(null , {deleted: true});
            }
            return output(body);
        })
    }
};
