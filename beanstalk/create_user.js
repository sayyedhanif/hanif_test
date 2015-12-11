var request = require('request');

module.exports = function(){

    this.id = "beanstalk-users-create";
    this.label = "Create User";

    this.input = {
        "title": "Create User",
        "type": "object",
        "properties": {
            "account":{
                "title":"Account Name",
                "type": "string",
                "description":"Enter account name that is subdomain like [account_name].beanstalk.com",
                "minLength": 1
            },
            "username":{
                "title":"Username",
                "type": "string",
                "description":"Enter user name",
                "minLength": 1
            },
            "token":{
                "title":"User Password",
                "type": "string",
                "description":"Enter password",
                "minLength": 1,
                "format": "password"
            },
            "name":{
                "title":"Full Name",
                "type": "string",
                "description":"Enter full name like FIRST LAST",
                "minLength": 1
            },            
            "email":{
                "title":"Email",
                "type": "string",
                "description":"Enter your email id",
                "minLength": 1
            },
            "login":{
                "title":"Username or Login name",
                "type": "string",
                "description":"Enter username for login and must be unique in the Account.",
                "minLength": 1
            },
            "password":{
                "title":"Password",
                "type": "string",
                "format": "password",
                "description":"Enter password",
                "minLength": 1
            }
        }
    };

    this.help = "Service to create users";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "message": {
                "title": "message",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){
        var userJSON = {};

        userJSON = { 
            "name": input.name.trim(),
            "login": input.login.trim(),
            "email": input.email.trim(),
            "password": input.password.trim()
        };
        console.log(userJSON)
        
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/users.json';
        request.post({
            url:URL,
            json:{user: userJSON},
            json:true
        }, function(err, response, body){
            if(err){
                return output(err);
            }
            else{
                // console.log("responsecode: "+response.statusCode)
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    console.log('body')
                    console.log(body)
                    return output(null, {message: "User created successfully"});
                }
                return output(body);
            }
        })
    };    
}