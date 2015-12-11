var request = require('request');

module.exports = function(){

    this.id = "jive-place-groups-get";
    this.label = "Get Groups";
    this.input = {
        "title": "Get Groups",
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
                "description": "Enter the starting index value of groups data array, default index value is zero",
                "default": '0'
            }
        }
    };

    this.help = "Service to get all place of type groups in Jive portal";

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
                        "placeID": {
                            "title": "placeID",
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
                        "memberCount": {
                            "title": "memberCount",
                            "type": "number"
                        },
                        "viewCount": {
                            "title": "viewCount",
                            "type": "number"
                        },
                        "displayName": {
                            "title": "displayName",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "groupType": {
                            "title": "groupType",
                            "type": "string"
                        },
                        "status": {
                            "title": "status",
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

        var Url = input.site_url+ "/api/core/v3/places?filter=type(group)";
        Url = input.startIndex=='' ? Url : Url+= "&startIndex="+ input.startIndex;
        Url = input.itemsPerPage=='' ? Url : Url+= "&count="+input.itemsPerPage;

        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/places?filter=type(group)&count="+input.itemsPerPage+"&startIndex="+ input.startIndex,
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