var request = require('request');

module.exports = function(){

    this.id = "wordpress-category-delete";
    this.label = "Delete Category";

    this.input = {
        "title": "Delete Category",
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
            "slug" : {
                "type" : "string",
                "title" : "Category Slug",
                "minLength" : 1,
                "description" : "The category slug"
            }
        }
    };

    this.help = "This activity delete specified category";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": { 
            "slug" : {
                "type" : "string",
                "title" : "slug"
            },
            "success" : {
                "type" : "string",
                "title" : "success"
            }            
        }
    };

    this.execute = function(input,output){

        request({
            method : 'POST', 
            headers : {
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/categories/slug:'+input.slug+'/delete' 
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
