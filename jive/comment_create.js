var request = require('request');

module.exports = function(){

    this.id = "jive-content-comment-create";
    this.label = "Create a Comment";
    this.input = {
        "title": "Create a Comment",
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
                "description": "Enter the content ID of pecified content (either post, discussion, document, etc) for which to create a comment"
            },
            "comment_text": {
                "type": "string",
                "title": "Comment Text",
                "format": "textarea",
                "minLength": 1,
                "description": "Enter the text to comment on specified content (either post, discussion, document, etc)"
            }
        }
    };

    this.help = "Service to create comment on particular content in Jive paortal";

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
            "helpfulCount": {
                "title": "helpfulCount",
                "type": "number"
            },
            "parent": {
                "title": "parent",
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
            "rootType": {
                "title": "rootType",
                "type": "string"
            },
            "rootURI": {
                "title": "rootURI",
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
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/contents/"+ input.content_id +"/comments",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "type": "message",
                "content": { 
                    "type": "text/html",
                    "text": input.comment_text
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
                delete body.resources;
                return output(null , body);
            }
            return output(body);
        })
    }
};