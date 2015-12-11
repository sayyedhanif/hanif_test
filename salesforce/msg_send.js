var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-message-send";
    this.label = "Send Private Message";

    this.input = {
        "title": "Send Private Message",
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
            "text": {
                "title": "Message Text",
                "type": "string",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter message body or content"
            },
            "recipients": {
                "title": "Recipient IDs",
                "type": "string",
                "minLength": 1,
                "description": "List of users who are the intended message recipients, up to 9. Comma-separated list of user IDs"
            }
        }
    };

    this.help = "Service to send private message to specified users";

    this.output = {
        "type" : "object",
        "properties": {
            "sender": {
                "title": "sender",
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
            "recipients": {
                "title": "recipients",
                "type": "array",
                "items": {
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
                }
            },    
            "id": {
                "title": "id",
                "type": "string"
            },
            "sentDate": {
                "title": "sentDate",
                "type": "string"
            },
            "url": {
                "title": "url",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){
        console.log(input.recipients)

        request({
            method : 'POST', 
            headers : {
                "Authorization": "Bearer "+ input.access_token,
                "Content-Type" : "application/x-www-form-urlencoded" 
            },          
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/users/me/messages",
            form: {
                "text": input.text,
                "recipients": input.recipients
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
