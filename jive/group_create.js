var request = require('request');

module.exports = function(){

    this.id = "jive-place-group-create";
    this.label = "Create a Group";
    this.input = {
        "title": "Create a Group",
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
            "displayName": {
                "type": "string",
                "title": "Display Name",
                "minLength": 1,
                "description": "Display name of this group. It must be unique in Jive portal"
            },
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "description": "Formal name of this group. It must be unique in Jive portal"
            },
            "groupType": {
                "type": "string",
                "title": "Group Type",
                "enum": ["OPEN", "MEMBER_ONLY", "PRIVATE", "SECRET"],
                "minLength": 1,
                "description": "Membership and visibility type of this group"
            }
        }
    };

    this.help = "Service to create new group in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
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
            url: input.site_url+ "/api/core/v3/places",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "type": "group",
                "displayName": input.displayName,
                "name": input.name,
                "groupType": input.groupType
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