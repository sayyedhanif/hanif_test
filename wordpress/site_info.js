var request = require('request');

module.exports = function(){

    this.id = "wordpress-site-info-get";
    this.label = "Get Site Information";

    this.input = {
        "title": "Get Site Information",
        "type": "object",
        "properties": {            
            "site" : {
                "type" : "string",
                "title" : "Site",
                "minLength" : 1,
                "description" : "Site ID or domain",
                "default": "99565333"
            }
        }
    };

    this.help = "Get information about site";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "ID" : {
                "type" : "number",
                "title" : "ID"
            },
            "name" : {
                "type" : "string",
                "title" : "name"
            },
            "description" : {
                "type" : "string",
                "title" : "description"
            },
            "URL" : {
                "type" : "string",
                "title" : "URL"
            },
            "jetpack" : {
                "type" : "boolean",
                "title" : "jetpack"
            },
            "subscribers_count" : {
                "type" : "number",
                "title" : "subscribers_count"
            },
            "logo" : {
                "type" : "object",
                "title" : "logo",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "number"
                    },
                    "url": {
                        "title": "url",
                        "type": "string"
                    }
                }
            },
            "is_private" : {
                "type" : "boolean",
                "title" : "is_private"
            },
            "is_following" : {
                "type" : "boolean",
                "title" : "is_following"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET',            
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(body)
        })
    };
};
