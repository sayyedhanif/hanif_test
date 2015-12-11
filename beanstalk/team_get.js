var request = require('request');

module.exports = function(){

    this.id = "beanstalk-team-list-get";
    this.label = "Teams List";

    this.input = {
        "title": "Teams List",
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

    this.help = "Service to fetch all teams";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "teams": {
                "title": "teams",
                "type": "array",
                "items": {
                    "properties": {
                        "team": {
                            "title": "team",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "title": "id",
                                    "type": "integer"
                                },
                                "name": {
                                    "title": "name",
                                    "type": "string"
                                },
                                "color_label": {
                                    "title": "color_label",
                                    "type": "string"
                                },
                                "created_at": {
                                    "title": "created_at",
                                    "type": "string"
                                },
                                "updated_at": {
                                    "title": "updated_at",
                                    "type": "string"
                                }                                
                            }
                        }                        
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/teams.json';
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
                    return output(null, {teams : body});
                }
                return output(body);
            }
        })
    };    
}