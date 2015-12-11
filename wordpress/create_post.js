var request = require('request');

module.exports = function(){

    this.id = "wordpress-post-create";
    this.label = "Create New Post";

    this.input = {
        "title": "Create New Post",
        "type": "object",
        "properties": {
            "accessToken" : {
                "type" : "string",
                "title" : "Wordpress Access Token",
                "minLength" : 1,
                "default": "u*HT(@oeCQ&#&b)cEQBwFtR(JvTM)LEb^eIs^iCAZJ6uRwIpNp!zdWlrdAHqw#wj"
            },
            "site" : {
                "type" : "string",
                "title" : "Site",
                "minLength" : 1,
                "description" : "Site ID or domain",
                "default": "99565333"
            },
            "title" : {
                "type" : "string",
                "title" : "Title",
                "minLength" : 1,
                "description" : "Title of the post(support html content)"
            },
            "content" : {
                "type" : "string",
                "title" : "Content",
                "description" : "Content of the post(support html content)"
            },
            "sticky" : {
                "type" : "string",
                "title" : "Sticky",
                "enum" : ["false", "true"],
                "description" : "If true, stick the post to the front page."
            },
            "status" : {
                "type" : "string",
                "title" : "Status",
                "enum" : ["publish", "private", "draft", "pending", "auto-draft"],
                "description" : "What would be the status of the post"
            },
            "categories" : {
                "type" : "string",
                "title" : "Categories",
                "description" : "Comma-separated list or array of categories (name or id)"
            },
            "tags" : {
                "type" : "string",
                "title" : "Tags",
                "description" : "Comma-separated list or array of tags (name or id)"
            }
        }
    };

    this.help = "Create a new post for site";

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
    };

    this.execute = function(input,output){

        request({
            method : 'POST',
            headers: {
                "authorization": "Bearer "+ input.accessToken
            },
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/posts/new',
            form: {
                "title": input.title,
                "content": input.content,
                "sticky": input.sticky,
                "status": input.status,
                "tags": input.tags,
                "categories": input.categories 
            }
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
