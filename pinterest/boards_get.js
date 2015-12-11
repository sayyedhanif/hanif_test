var request = require("request");

module.exports = function(){

    this.id = "pinterest-boards-get";
    this.label = "Get User's Boards";

    this.input = {
        "title": "Get User's Boards",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get the user's boards";

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
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "string"
                        }
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
            url : "https://api.pinterest.com/v1/me/boards/"
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
