var request = require('request');

module.exports = function(){

    this.id = "jive-content-get";
    this.label = "Get Content";
    this.input = {
        "title": "Get Content",
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
            "content_id": {
                "type": "string",
                "title": "Content ID",
                "minLength": 1,
                "description": "Enter the content ID that you want to see details for"
            }
        }
    };

    this.help = "Service to retrieve particular content details from Jive portal either discussion, document, etc depends on given content ID";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
            url: ""+input.site_url+"/api/core/v3/contents/"+ input.content_id,
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
                    body = body.replace("throw 'allowIllegalResourceCall is false.';", ""); // here body return specified replace text + object in string format
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};