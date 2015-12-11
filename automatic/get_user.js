var request = require('request');

module.exports = function(){
    this.id = "automatic-user-detail";

    this.label = "Get User Detail";

    this.input = {
        "title": "Get User Detail",
        "type": "object",
        "properties": {      
            "accessToken" : {
                "type" : "string",
                "title" : "Automatic Access Token",
                "minLength" : 1,
                "default": "f6824d1e6854e6a5a57e688767ba2560072bf54b"
            }
        }
    };

    this.help = "This activity returns current user details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "id" : {
                "type" : "string",
                "title" : "id"
            },            
            "url" : {
                "type" : "string",
                "title" : "url"
            },
            "username" : {
                "type" : "string",
                "title" : "username"
            },            
            "first_name" : {
                "type" : "string",
                "title" : "first_name"
            },
            "last_name" : {
                "type" : "string",
                "title" : "last_name"
            },            
            "email" : {
                "type" : "string",
                "title" : "email"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method :'GET', 
            headers :{
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/user/me'
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