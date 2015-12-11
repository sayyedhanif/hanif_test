var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-feed-comment";
    this.label = "Create Comment On Feed";

    this.input = {
        "title": "Create Comment On Feed",
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
            "feedElementId": {
                "title": "Feed Element ID",
                "type": "string",
                "minLength": 1,
                "description": "Enter feed Element ID to which comment"
            },           
            "text": {
                "title": "Post Text",
                "type": "string",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter text to comment on particular feed"
            }            
        }
    };

    this.help = "Service to comment on particular feed item in Salesforce chatter";

    this.output = {
        "type" : "object",
        "properties": {
            "user": {
                "title": "user",
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
            "body": {
                "title": "body",
                "type": "object",
                "properties": {
                    "text": {
                        "title": "text",
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
            "feedElement": {
                "title": "feedElement",
                "type": "object",
                "properties" : {
                	"id": {
                        "title": "id",
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
            "type": {
                "title": "type",
                "type": "string"
            },
            "url": {
                "title": "url",
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
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/feed-elements/"+ input.feedElementId +"/capabilities/comments/items",
            form: {
                "text": input.text
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
