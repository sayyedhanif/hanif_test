var request = require("request");

module.exports = function(){

    this.id = "pinterest-pin-get";
    this.label = "Get Pin Detail";

    this.input = {
        "title": "Get Pin Detail",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            },
            "pinId": {
                "title": "Pin ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter user's pin ID"
            }
        }
    };

    this.help = "Service to get specified pin detail";

    this.output = {
        "type" : "object",
        "properties": {
            "data": {
                "title": "data",
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
        }
    };

    this.execute = function(input,output){
        request({
            method : 'GET', 
            headers : {
                "authorization": "Bearer "+ input.access_token
            },          
            url : "https://api.pinterest.com/v1/pins/"+ input.pinId +"/"
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
