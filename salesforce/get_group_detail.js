var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-group-detail";
    this.label = "Get Group Detail";

    this.input = {
        "title": "Get Group Detail",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Salesforce Access Token",
                "type": "string",
                "minLength": 1
            },
            "instance_url": {
                "title": "Instance URL",
                "type": "string",
                "minLength": 1,
                "description": "Enter site instance url"
            }, 
            "groupId": {
                "title": "Group ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter group ID "
            }       
        }
    };

    this.help = "Service to get specified group detail";

    this.output = {
        "type" : "object",
        "properties": {
            "owner": {
                "title": "owner",
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "string"
                    },                    
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "url": {
                        "title": "url",
                        "type": "string"
                    }
                }
            },            
            "id": {
                "title": "id",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "description": {
                "title": "description",
                "type": "string"
            },
            "memberCount": {
                "title": "memberCount",
                "type": "number"
            },
            "myRole": {
                "title": "myRole",
                "type": "string"
            },
            "type": {
                "title": "type",
                "type": "string"
            },
            "url": {
                "title": "url",
                "type": "string"
            },
            "visibility": {
                "title": "visibility",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET', 
            headers : {
                "Authorization": "Bearer "+ input.access_token,
                "Content-Type" : "application/x-www-form-urlencoded" 
            },          
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/groups/"+ input.groupId 
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
