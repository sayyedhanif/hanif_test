var request = require("request");

module.exports = function(){

    this.id = "salseforce-chatter-user-following";
    this.label = "Get Users Following";

    this.input = {
        "title": "Get Users Following",
        "type": "object",
        "properties": {
            "access_token": {
                "title": "Salesforce Access Token",
                "type": "string",
                "minLength": 1,
                "oauth": "salesforce"
            },
            "instance_url": {
                "title": "Instance URL",
                "type": "string",
                "minLength": 1,
                "description": "Instance url of your account in the format xy1.salesforce.com"
            }
        }
    };

    this.help = "Service to get the current user's following users";

    this.output = {
        "type" : "object",
        "properties": {
            "currentPageUrl": {
                "title": "currentPageUrl",
                "type": "string"
            },
            "nextPageUrl": {
                "title": "nextPageUrl",
                "type": "string"
            },
            "previousPageUrl": {
                "title": "previousPageUrl",
                "type": "string"
            },
            "total": {
                "title": "total",
                "type": "number"
            },
            "following": {
                "title": "following",
                "type" : "array",
                "items":{
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },  
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                        "subject": {
                            "title": "subject",
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
                        "subscriber": {
                            "title": "subscriber",
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
                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        input.instance_url = input.instance_url.replace(/^http:\/\//, 'https://');

        var prefixHttps = "https://";

        if (input.instance_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.instance_url = prefixHttps + input.instance_url;
        }

        request({
            method : 'GET',
            headers : {
                "Authorization": "Bearer "+ input.access_token
            },
            url : ""+ input.instance_url + "/services/data/v34.0/chatter/users/me/following"
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