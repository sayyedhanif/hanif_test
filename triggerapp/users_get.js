var request = require('request');

module.exports = function(){

    this.id = "triggerapp-users-get";
    this.label = "Get Users List";
    this.input = {
        "title": "Get Users List",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp API Key",
                "minLength": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp Token",
                "minLength": 1,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            }                     
        }
    };

    this.help = "Returns all users of current account.";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "users":{
                "title": "users",
                "type": "array",
                "items": {
                    "properties": {
                        "user": {
                            "title": "user",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "number"
                                },
                                "name": {
                                    "title": "name",
                                    "type": "string"
                                },
                                "phone": {
                                    "title": "phone",
                                    "type": "any"
                                },
                                "email": {
                                    "title": "email",
                                    "type": "any"
                                },
                                "slug": {
                                    "title": "slug",
                                    "type": "string"
                                },
                                "role": {
                                    "title": "role",
                                    "type": "string"
                                },
                                "created_at": {
                                    "title": "created_at",
                                    "type": "string"
                                }                                
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',           
            url: "https://www.triggerapp.com/api/v1/users?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
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