var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-feed-share";
    this.label = "Share Feed Element";

    this.input = {
        "title": "Create Feed Element",
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
            "originalFeedElementId": {
                "title": "Feed Element ID",
                "type": "string",
                "minLength": 1,
                "description": ""
            } 
        }
    };

    this.help = "Service to share feed item in Salesforce chatter";

    this.output = {
        "type" : "object",
        "properties": {
            "actor": {
                "title": "actor",
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
            "clientInfo": {
                "title": "clientInfo",
                "type": "object",
                "properties": {
                    "applicationName": {
                        "title": "applicationName",
                        "type": "string"
                    },
                    "applicationUrl": {
                        "title": "applicationUrl",
                        "type": "any"
                    }
                }
            },
            "parent": {
                "title": "parent",
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
            "createdDate": {
                "title": "createdDate",
                "type": "string"
            },
            "canShare": {
                "title": "canShare",
                "type": "boolean"
            },
            "event": {
                "title": "event",
                "type": "boolean"
            },
            "feedElementType": {
                "title": "feedElementType",
                "type": "string"
            },
            "id": {
                "title": "id",
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
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/feed-elements",
            form: {
                "subjectId": "me",  // here you can get id of user too
                "originalFeedElementId": input.originalFeedElementId
            }
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
