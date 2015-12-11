var request = require('request');

module.exports = function(){

    this.id = "triggerapp-company-users-get";
    this.label = "Get Company Specific Users";
    this.input = {
        "title": "Get Company Specific Users",
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
            },
            "company_id": {
                "type": "string",
                "title": "Company ID",
                "minLength": 1,
                "description": "Enter company id"
            }                               
        }
    };

    this.help = "Returns all users of a specific company.";

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
            url: "https://www.triggerapp.com/api/v1/companies/"+input.company_id+"/users?token="+input.token+"&api_key="+input.api_key
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