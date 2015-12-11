var request = require('request');

module.exports = function(){

    this.id = "jive-content-create";
    this.label = "Create Contents";
    this.input = {
        "title": "Create Contents",
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
            "contentType": {
                "type": "string",
                "title": "Type",
                "enum": ["Discussion", "Document", "Post"],
                "minLength": 1,
                "description": "Select the Jive content's type that you want to create contents for"
            },
            "subject": {
                "type": "string",
                "title": "Subject",
                "minLength": 1,
                "description": "Enter the subject for new content"
            },
            "text": {
                "type": "string",
                "title": "Description",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter description of content"
            }
        }
    };

    this.help = "Service to create contents in Jive portal like discussion, document, etc";

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
        var typeObj = {
            "Document": "document",
            "Discussion": "discussion",
            "Post": "post"
        };

        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        request({
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+"/api/core/v3/activities",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "type": typeObj[input.contentType],
                "subject": input.subject,
                "content": { 
                    "type": "text/html",
                    "text": input.text
                }
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};