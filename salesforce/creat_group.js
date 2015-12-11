var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-group-create";
    this.label = "Create Group";

    this.input = {
        "title": "Create Group",
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
            "name": {
                "title": "Group Name",
                "type": "string",
                "minLength": 1,
                "description": "Enter the name of the group"
            },
            "description": {
                "title": "Group Description",
                "type": "string",
                "description": "Enter short description about your group"
            },
            "visibility": {
                "title": "Group Visibility",
                "type": "string",
                "enum": [
                    "PublicAccess", "PrivateAccess", "Unlisted"
                ],
                "minLength": 1,
                "description": "Specifies the group visibility type. One of the above values"
            }         
        }
    };

    this.help = "Service to create new group in Salesforce chatter";

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
                "type": "any"
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
            method : 'POST', 
            headers : {
                "Authorization": "Bearer "+ input.access_token,
                "Content-Type" : "application/x-www-form-urlencoded" 
            },          
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/groups",
            form : {
                "name": input.name,
                "visibility": input.visibility
            } 
        },
        function(err,res,body){
            console.log(err, body);
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
