var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-user-detail";
    this.label = "Get User Detail";

    this.input = {
        "title": "Get User Detail",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Salesforce Chatter Access Token",
                "type": "string",
                "minLength": 1
            },
            "instance_url": {
                "title": "Instance URL",
                "type": "string",
                "minLength": 1,
                "description": "Enter site instance url"
            }
        }
    };

    this.help = "Service to get the current user's detail";

    this.output = {
        "type" : "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "string"
            },
            "companyName": {
                "title": "companyName",
                "type": "string"
            },
            "isActive": {
                "title": "isActive",
                "type": "boolean"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "email": {
                "title": "email",
                "type": "string"
            },
            "url": {
                "title": "url",
                "type": "string"
            },
            "type": {
                "title": "type",
                "type": "string"
            },
            "followersCount": {
                "title": "followersCount",
                "type": "number"
            },
            "followingCounts": {
                "title": "followingCounts",
                "type": "object",
                "properties": {
                    "people": {
                        "title": "people",
                        "type": "number"
                    },
                    "records": {
                        "title": "records",
                        "type": "number"
                    },
                    "total": {
                        "title": "total",
                        "type": "number"
                    }
                }
            },
            "groupCount": {
                "title": "groupCount",
                "type": "number"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET', 
            headers : {
                "Authorization": "Bearer "+ input.access_token
            },          
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/users/me"
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
