var request = require('request');

module.exports = function(){

    this.id = "wordpress-tag-create";
    this.label = "Create New Tag";

    this.input = {
        "title": "Create New Tag",
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
            "name" : {
                "type" : "string",
                "title" : "Tag Name",
                "minLength" : 1,
                "description" : "Name of the tag"
            },
            "description": {
                "title": "Description",
                "type": "string",
                "minLength" : 1,
                "description": "A description of the tag"
            }
        }
    };

    this.help = "This activity create a new tag";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "ID" : {
                "type" : "number",
                "title" : "ID"
            },
            "name" : {
                "type" : "string",
                "title" : "name"
            },          
            "slug" : {
                "type" : "string",
                "title" : "slug"
            },
            "description" : {
                "type" : "string",
                "title" : "description"
            },
            "post_count" : {
                "type" : "number",
                "title" : "post_count"
            }                    
        }
    };

    this.execute = function(input,output){

        request({
            method : 'POST', 
            headers : {
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/tags/new' ,
            form : {
                "name" : input.name,
                "description": input.description
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
