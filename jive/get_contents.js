var request = require('request');

module.exports = function(){

    this.id = "jive-contents-get";
    this.label = "Get Contents";
    this.input = {
        "title": "Get Contents",
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
                "description": "Enter the starting index value of content data array, default index value is zero",
                "default": '0'
            },
            "type_filter": {
                "type": "string",
                "title": "Filter By Type",
                "description": "Filter the result eihter by 'document', 'discussion', task, or 'post' contents. A comma separted value"
            }
        }
    };

    this.help = "Service to get contents in Jive portal like discussion, document, etc";

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
                        "likeCount": {
                            "title": "likeCount",
                            "type": "number"
                        },
                        "replyCount": {
                            "title": "replyCount",
                            "type": "number"
                        },
                        "viewCount": {
                            "title": "viewCount",
                            "type": "number"
                        },
                        "favoriteCount": {
                            "title": "favoriteCount",
                            "type": "number"
                        },             
                        "contentID": {
                            "title": "contentID",
                            "type": "string"
                        },
                        "subject": {
                            "title": "subject",
                            "type": "string"
                        },
                        "content": {
                            "title": "content",
                            "type": "object"
                        },
                        "status": {
                            "title": "status",
                            "type": "string"
                        },
                        "completed": {
                            "title": "completed",
                            "type": "boolean"
                        },
                        "owner": {
                            "title": "owner",
                            "type": "string"
                        },
                        "parent": {
                            "title": "parent",
                            "type": "string"
                        },
                        "dueDate": {
                            "title": "dueDate",
                            "type": "string"
                        },
                        "visibility": {
                            "title": "visibility",
                            "type": "string"
                        },
                        "author": {
                            "title": "author",
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

        var Url = input.site_url+ "/api/core/v3/contents?count="+input.itemsPerPage+"&startIndex="+ input.startIndex; 
        
        request({
            method :'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.type_filter=='' ? Url : Url+= "&filter=type("+ input.type_filter+")",
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
                console.log(body.list.length)
                return output(null , body);
            }
            return output(body);
        })
    }
};