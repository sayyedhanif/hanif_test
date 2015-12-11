var request = require('request');


module.exports = function(){

    this.id = "getsatisfaction-topics-replies-get";
    this.label = "Get replies of specific topic"; 

    this.input = { 
        "title": "Get replies of specific topic",
        "type": "object",
        "properties": {  
            "slug_or_id":{
                "title": "Topics slug or id",
                "type": "string",
                "description": "To get id or slug from calling  https://api.getsatisfaction.com/topics.json",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get all replies of specific topic"
    
    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "data": {
                "title": "data",
                "type": "array",
                "items": {
                    "properties": {
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
                        "company_promoted": {
                            "title": "company_promoted",
                            "type": "boolean"
                        },
                        "comment_count": {
                            "title": "comment_count",
                            "type": "integer"
                        },
                        "star_count": {
                            "title": "star_count",
                            "type": "integer"
                        },
                        "star_promoted": {
                            "title": "star_promoted",
                            "type": "boolean"
                        },
                        "comments_url": {
                            "title": "comments_url",
                            "type": "string"
                        },
                        "employee": {
                            "title": "employee",
                            "type": "boolean"
                        },
                        "content": {
                            "title": "content",
                            "type": "string"
                        },
                        "topic_id": {
                            "title": "topic_id",
                            "type": "integer"
                        },
                        "id": {
                            "title": "id",
                            "type": "integer"
                        },
                        "created_at": {
                            "title": "created_at",
                            "type": "string"
                        },
                        "url": {
                            "title": "url",
                            "type": "string"
                        }
                    }
                }
            },
            "total": {
                "title": "total",
                "type": "integer"
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url: "https://api.getsatisfaction.com/topics/"+input.slug_or_id.trim()+"/replies.json"
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

