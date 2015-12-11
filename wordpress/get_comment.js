var request = require('request');

module.exports = function(){

    this.id = "wordpress-comment-detail";
    this.label = "Comment Detail";

    this.input = {
        "title": "Comment Detail",
        "type": "object",
        "properties": { 
            "site" : {
                "type" : "string",
                "title" : "Site",
                "minLength" : 1,
                "description" : "Site ID or domain",
                "default": "99565333"
            },
            "commentId" : {
                "type" : "string",
                "title" : "Comment ID",
                "minLength" : 1,
                "description" : "Enter comment id"
            }
        }
    };

    this.help = "This activity return a single comment";

    this.output = {
        "title": "output",
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
            "content" : {
                "type" : "string",
                "title" : "content"
            },
            "URL" : {
                "type" : "string",
                "title" : "URL"
            },
            "status" : {
                "type" : "string",
                "title" : "status"
            },
            "type" : {
                "type" : "string",
                "title" : "type"
            },
            "parent" : {
                "type" : "any",
                "title" : "status"
            },
            "like_count" : {
                "type" : "number",
                "title" : "like_count"
            },
            "post" : {
                "type" : "object",
                "title" : "post",
                "properties": {
                    "ID" : {
                        "type" : "number",
                        "title" : "ID"
                    },
                    "title" : {
                        "type" : "string",
                        "title" : "title"
                    },
                    "link" : {
                        "type" : "string",
                        "title" : "link"
                    }                               
                }
            },    
            "author" : {
                "type" : "object",
                "title" : "author",
                "properties": {
                    "ID" : {
                        "type" : "number",
                        "title" : "ID"
                    },
                    "login" : {
                        "type" : "string",
                        "title" : "login"
                    },
                    "email" : {
                        "type" : "string",
                        "title" : "email"
                    },
                    "name" : {
                        "type" : "string",
                        "title" : "name"
                    }               
                }
            }                    
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET',                
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/comments/'+input.commentId
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
