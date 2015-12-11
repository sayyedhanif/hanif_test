var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-topics-list-get";
    this.label = "Topics list"; 

    this.input = { 
        "title": "Topics list",
        "type": "object",
        "properties": {  
        }
    };

    this.help = "Service to get all topics in getsatisfaction communities";
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "total": {
                "title": "total",
                "type": "integer"
            },
            "data": {
                "title": "data",
                "type": "array",
                "items": {
                    "properties": {
                        "is_spam": {
                            "title": "is_spam",
                            "type": "boolean"
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
                        "follower_count": {
                            "title": "follower_count",
                            "type": "integer"
                        },
                        "has_promoted_replies": {
                            "title": "has_promoted_replies",
                            "type": "boolean"
                        },
                        "user_defined_code": {
                            "title": "user_defined_code",
                            "type": "any"
                        },
                        "most_recent_activity": {
                            "title": "most_recent_activity",
                            "type": "string"
                        },
                        "emotitag": {
                            "title": "emotitag",
                            "type": "object",
                            "properties": {
                                "face": {
                                    "title": "face",
                                    "type": "string"
                                },
                                "feeling": {
                                    "title": "feeling",
                                    "type": "any"
                                },
                                "intensity": {
                                    "title": "intensity",
                                    "type": "integer"
                                }
                            }
                        },
                        "is_removed": {
                            "title": "is_removed",
                            "type": "boolean"
                        },
                        "slug": {
                            "title": "slug",
                            "type": "string"
                        },
                        "status": {
                            "title": "status",
                            "type": "any"
                        },
                        "is_closed": {
                            "title": "is_closed",
                            "type": "boolean"
                        },
                        "active_replies": {
                            "title": "active_replies",
                            "type": "integer"
                        },
                        "is_archived": {
                            "title": "is_archived",
                            "type": "boolean"
                        },
                        "at_sfn": {
                            "title": "at_sfn",
                            "type": "string"
                        },
                        "reply_count": {
                            "title": "reply_count",
                            "type": "integer"
                        },
                        "content": {
                            "title": "content",
                            "type": "string"
                        },
                        "subject": {
                            "title": "subject",
                            "type": "string"
                        },
                        "employee": {
                            "title": "employee",
                            "type": "boolean"
                        },
                        "me_too_count": {
                            "title": "me_too_count",
                            "type": "integer"
                        },
                        "style": {
                            "title": "style",
                            "type": "string"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },
                        "created_at": {
                            "title": "created_at",
                            "type": "string"
                        },
                        "last_active_at": {
                            "title": "last_active_at",
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
                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url: "https://api.getsatisfaction.com/topics.json"
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

