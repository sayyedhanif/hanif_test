var request = require("request");

module.exports = function(){

    this.id = "pinterest-user-detail";
    this.label = "Get User Detail";

    this.input = {
        "title": "Get User Detail",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Pinterest Access Token",
                "type": "string",
                "minLength": 1
            }
        }
    };

    this.help = "Service to fetch user details";

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
                    "first_name": {
                        "title": "first_name",
                        "type": "string"
                    },
                    "last_name": {
                        "title": "last_name",
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
            url : "https://api.pinterest.com/v1/me/"
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
