var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-topics-details-get";
    this.label = "Get specific topic"; 

    this.input = { 
        "title": "Get specific topic",
        "type": "object",
        "properties": {  
            "slug_or_id":{
                "title": "Topic slug or id",
                "type": "string",
                "description": "To get id or slug from calling  https://api.getsatisfaction.com/topics.json",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get specific topic in getsatisfaction communities";
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "products": {
                "title": "products",
                "type": "array",
                "items": {
                    "properties": {
                        "url": {
                            "title": "url",
                            "type": "string"
                        },
                        "canonical_name": {
                            "title": "canonical_name",
                            "type": "string"
                        },
                        "name": {
                            "title": "name",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        }
                    }
                }
            },
            "author":{
                "title": "author",
                "type": "object",
                "properties": {
                    "title":{
                        "title": "title",
                        "type": "string"
                    },
                    "avatar_url_large":{
                        "title": "avatar_url_large",
                        "type": "string"
                    },
                    "avatar_url_small":{
                        "title": "avatar_url_small",
                        "type": "string"
                    },
                    "at_sfn":{
                        "title": "at_sfn",
                        "type": "string"
                    },
                    "champion":{
                        "title": "champion",
                        "type": "boolean"
                    },
                    "name":{
                        "title": "name",
                        "type": "string"
                    },
                    "employee":{
                        "title": "employee",
                        "type": "boolean"
                    },
                    "member_since":{
                        "title": "member_since",
                        "type": "string"
                    },
                    "avatar":{
                        "title": "avatar",
                        "type": "string"
                    },
                    "avatar_url_mini":{
                        "title": "avatar_url_mini",
                        "type": "string"
                    },
                    "canonical_name":{
                        "title": "canonical_name",
                        "type": "string"
                    },
                    "id":{
                        "title": "id",
                        "type": "integer"
                    },
                    "avatar_url_medium":{
                        "title": "avatar_url_medium",
                        "type": "string"
                    },
                    "url":{
                        "title": "url",
                        "type": "string"
                    }
                }
            },
            "is_archived":{
                "title": "is_archived",
                "type": "boolean"
            },
            "has_promoted_replies": {
                "title": "has_promoted_replies",
                "type": "boolean"
            },
            "content": {
                "title": "content",
                "type": "string"
            },
            "last_active_at": {
                "title": "last_active_at",
                "type": "string"
            },
            "status": {
                "title": "status",
                "type": "any"
            },
            "employee": {
                "title": "employee",
                "type": "boolean"
            },
            "follower_count": {
                "title": "follower_count",
                "type" : "integer"
            },
            "style": {
                "title": "style",
                "type": "string"
            },
            "created_at": {
                "title": "created_at",
                "type": "string"
            },
            "most_recent_activity": {
                "title": "most_recent_activity",
                "type": "string"
            },
            "url": {
                "title": "url",
                "type": "string"
            },
            "company_id": {
                "title": "company_id",
                "type": "integer"
            },
            "is_removed": {
                "title": "is_removed",
                "type": "boolean"
            },
            "me_too_count": {
                "title": "me_too_count",
                "type": "integer"
            },
            "product_count": {
                "title": "product_count",
                "type": "integer"
            },
            "active_replies": {
                "title": "active_replies",
                "type": "integer"
            },
            "reply_count": {
                "title": "reply_count",
                "type": "integer"
            },
            "is_closed": {
                "title": "is_closed",
                "type": "boolean"
            },
            "is_spam": {
                "title": "is_spam",
                "type": "boolean"
            },
            "id": {
                "title": "id",
                "type": "integer"
            },
            "at_sfn": {
                "title": "at_sfn",
                "type": "string"
            },
            "slug": {
                "title": "slug",
                "type": "string"
            },
            "user_defined_code": {
                "title": "user_defined_code",
                "type": "any"
            }       
        }
    };

    this.execute = function(input,output){
        request.get({
            url: "https://api.getsatisfaction.com/topics/"+input.slug_or_id.trim()+".json"
        }, function(err,response,body){
            if(err)
            {
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,body);
                }
                return output(body);
            }
        });
    };    
}