var request = require('request');

module.exports = function(){

    this.id = "beanstalk-users-list-get";
    this.label = "Users List";

    this.input = {
        "title": "Users List",
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
                "description":"Enter password or access token",
                "minLength": 1,
                "format": "password"
            }
        }
    };

    this.help = "Service to fetch all users";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "users": {
                "title": "users",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "user": {
                            "title": "user",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "integer"
                                },
                                "first_name": {
                                    "title": "first_name",
                                    "type": "string"
                                },
                                "last_name": {
                                    "title": "last_name",
                                    "type": "string"
                                },
                                "account_id": {
                                    "title": "account_id",
                                    "type": "integer"
                                },
                                "name": {
                                    "title": "name",
                                    "type": "string"
                                },
                                "created_at": {
                                    "title": "created_at",
                                    "type": "string"
                                },
                                "updated_at": {
                                    "title": "updated_at",
                                    "type": "string"
                                },
                                "login": {
                                    "title": "login",
                                    "type": "string"
                                },
                                "email": {
                                    "title": "email",
                                    "type": "string"
                                },
                                "timezone": {
                                    "title": "timezone",
                                    "type": "any"
                                },
                                "admin": {
                                    "title": "admin",
                                    "type": "any"
                                },
                                "can_create_repos": {
                                    "title": "can_create_repos",
                                    "type": "any"
                                },
                                "owner": {
                                    "title": "owner",
                                    "type": "boolean"
                                }
                            }
                        }                        
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/users.json';
        request.get({
            url:URL,
            json:true
        }, function(err, response, body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    console.log(body)
                    return output(null, {users: body});
                }
                return output(body);
            }
        })
    };    
}