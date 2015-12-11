var request = require('request');

module.exports = function(){

    this.id = "wordpress-posts-get";
    this.label = "Get All Post";

    this.input = {
        "title": "Get All Post",
        "type": "object",
        "properties": {           
            "site" : {
                "type" : "string",
                "title" : "Site",
                "minLength" : 1,
                "description" : "Site ID or domain",
                "default": "99565333"
            }
        }
    };

    this.help = "Returns all posts of specified site";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "found" : {
                "type" : "number",
                "title" : "found"
            },
            "posts" : {
                "type" : "array",
                "title" : "posts",
                "items": {
                    "type": "object",
                    "properties": {
                        "ID" : {
                            "type" : "number",
                            "title" : "ID"
                        },
                        "site_ID" : {
                            "type" : "number",
                            "title" : "site_ID"
                        },
                        "date" : {
                            "type" : "string",
                            "title" : "date"
                        },
                        "modified" : {
                            "type" : "string",
                            "title" : "modified"
                        },
                        "title" : {
                            "type" : "string",
                            "title" : "title"
                        },
                        "content" : {
                            "type" : "string",
                            "title" : "content"
                        },
                        "URL" : {
                            "type" : "string",
                            "title" : "URL"
                        },
                        "slug" : {
                            "type" : "string",
                            "title" : "slug"
                        },
                        "status" : {
                            "type" : "string",
                            "title" : "status"
                        },
                        "sticky" : {
                            "type" : "string",
                            "title" : "sticky"
                        },
                        "comment_count" : {
                            "type" : "number",
                            "title" : "comment_count"
                        },
                        "like_count" : {
                            "type" : "number",
                            "title" : "like_count"
                        },
                        "author" : {
                            "type" : "object",
                            "title" : "author",
                            "properties": {
                               
                            }
                        },
                        "tags" : {
                            "type" : "object",
                            "title" : "tags",
                            "properties": {
                               
                            }
                        },
                        "categories" : {
                            "type" : "object",
                            "title" : "categories",
                            "properties": {
                               
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET',           
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/posts/',
            
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(body)
        })
    };
};
