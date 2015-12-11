var request = require("request");

module.exports = function(){

    this.id = "pinterest-pin-search";
    this.label = "Search Pins" ;

    this.input = {
        "title": "Search Pins",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            },
            "query": {
                "title": "Search Query Text",
                "type": "string",
                "minLength": 1,
                "description": "Enter the text to search the particular pins"
            }
        }
    };

    this.help = "Service to search a user's pins";

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
            url : "https://api.pinterest.com/v1/me/search/pins/?query=" + input.query 
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
