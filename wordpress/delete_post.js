var request = require('request');

module.exports = function(){

    this.id = "wordpress-post-delete";
    this.label = "Delete Post";

    this.input = {
        "title": "Delete Post",
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
            "postId" : {
                "type" : "string",
                "title" : "Post ID",
                "minLength" : 1,
                "description" : "Enter post id"
            }
        }
    };

    this.help = "This activity delete/trash the post";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "status" : {
                "type" : "string",
                "title" : "status"
            }            
        }
    };

    this.execute = function(input,output){

        request({
            method : 'POST', 
            headers: {
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/posts/'+input.postId+'/delete'            
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
                return output(null, {"status": body.status});
            }
            return output(body)
        })
    };
};

