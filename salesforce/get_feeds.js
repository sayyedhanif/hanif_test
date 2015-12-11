var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-feeds-get";
    this.label = "Get My New Feeds";

    this.input = {
        "title": "Get My New Feeds",
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
            } 
        }
    };

    this.help = "Service to get all my news feeds on salesforce chatter";

    this.output = {
        "type" : "object",
        "properties": {
            "currentPageUrl": {
                "title": "currentPageUrl",
                "type": "string"
            },
            "elements": {
                "title": "elements",
                "type" : "array",
                "items":{
                    "type": "object",
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
                }
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
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/feeds/news/me/feed-elements" 
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
