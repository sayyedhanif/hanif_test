var request = require("request");

module.exports = function(){

    this.id = "pinterest-pins-get";
    this.label = "Get User's Pins";

    this.input = {
        "title": "Get User's Pins",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get the user's pins";

    this.output = {
        "type" : "object",
        "properties": {
           "data": {
                "title": "data",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                        "note": {
                            "title": "note",
                            "type": "string"
                        },
                        "link": {
                            "title": "link",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "string"
                        }
                    }
                }                
            },
            "page": {
                "title": "page",
                "type": "object",
                "properties": {
                    "cursor": {
                        "title": "cursor",
                        "type": "any"
                    },
                    "next": {
                        "title": "next",
                        "type": "any"
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        request({
            method : 'GET', 
            headers : {
                "authorization": "Bearer "+ input.access_token
            },          
            url : "https://api.pinterest.com/v1/me/pins/"
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
