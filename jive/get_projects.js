var request = require('request');

module.exports = function(){

    this.id = "jive-place-projects-get";
    this.label = "Get Projects";
    this.input = {
        "title": "Get Projects",
        "type": "object",
        "properties": {
            "site_url": {
                "type": "string",
                "title": "Site URL",
                "minLength": 1,
                "description": "Enter your site URL for Jive portal, eg. 'https://company-team.jiveon.com'"
            },
            "username": {
                "type": "string",
                "title": "Username",
                "minLength": 1,
                "description": "Enter the username of your Jive portal"
            },
            "password": {
                "type": "string",
                "title": " Password",
                "format": "password",
                "minLength": 1,
                "description": "Enter the password of your Jive portal"
            },
            "itemsPerPage": {
                "type": "string",
                "title": "Items Per Page",
                "description": "Enter the value for how many items should be return per page",
                "default": '25'
            },
            "startIndex": {
                "type": "string",
                "title": "Starting Index",
                "description": "Enter the starting index value of projects data array, default index value is zero",
                "default": '0'
            }
        }
    };

    this.help = "Service to get all place of type projects in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "startIndex": {
                "title": "startIndex",
                "type": "number"
            },
            "itemsPerPage": {
                "title": "itemsPerPage",
                "type": "number"
            },
            "links": {
                "title": "links",
                "type": "object",
                "properties": {
                    "previous": {
                        "title": "previous",
                        "type": "string"
                    },
                    "next": {
                        "title": "next",
                        "type": "string"
                    }
                }
            },
            "list": {
                "title": "list",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },
                        "type": {
                            "title": "type",
                            "type": "string"
                        },
                        "published": {
                            "title": "published",
                            "type": "string"
                        },
                        "updated": {
                            "title": "updated",
                            "type": "string"
                        },
                        "followerCount": {
                            "title": "followerCount",
                            "type": "number"
                        },
                        "viewCount": {
                            "title": "viewCount",
                            "type": "number"
                        },     
                        "placeID": {
                            "title": "placeID",
                            "type": "string"
                        },
                        "description": {
                            "title": "description",
                            "type": "string"
                        },
                        "displayName": {
                            "title": "displayName",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "parent": {
                            "title": "parent",
                            "type": "string"
                        },
                        "status": {
                            "title": "status",
                            "type": "string"
                        },
                        "dueDate": {
                            "title": "dueDate",
                            "type": "string"
                        },
                        "projectStatus": {
                            "title": "projectStatus",
                            "type": "string"
                        },
                        "startDate": {
                            "title": "startDate",
                            "type": "string"
                        },
                        "creator": {
                            "title": "creator",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "string"
                                },
                                "displayName": {
                                    "title": "displayName",
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
        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/places?filter=type(project)&count="+input.itemsPerPage+"&startIndex="+ input.startIndex,
            auth: {
                username: input.username,
                password: input.password
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", "");  // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};