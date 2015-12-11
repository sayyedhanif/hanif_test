var request = require('request');

module.exports = function(){

    this.id = "wordpress-comment-delete";
    this.label = "Delete Comment";

    this.input = {
        "title": "Delete Comment",
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
            "commentId" : {
                "type" : "string",
                "title" : "Comment ID",
                "minLength" : 1,
                "description" : "Enter comment id"
            }
        }
    };

    this.help = "This activity delete specified comment";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "ID" : {
                "type" : "number",
                "title" : "ID"
            },            
            "status" : {
                "type" : "string",
                "title" : "status"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'POST', 
            headers : {
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://public-api.wordpress.com/rest/v1/sites/'+input.site+'/comments/'+input.commentId+'/delete'
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
