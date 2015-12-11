var request = require('request');


module.exports = function(){

    this.id = "beanstalk-team-add-user";
    this.label = "Add Teams Users";

    this.input = {
        "title": "Add Teams Users",
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
            "team_id":{
                "title":"Teams Id",
                "type": "integer",
                "description":"Enter teams id",
                "minLength": 1
            },
             "user_id":{
                "title":"User Id",
                "type": "integer",
                "description":"Enter users id",
                "minLength": 1
            }  
        }
    };

    this.help = "Service to add a user to team";

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

       
        
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/teams/'+input.team_id.trim()+'/users.json';
        request.put({
            url:URL,
            json: { 
                "user_id": input.user_id.trim()
            },
            json:true
        }, function(err, response, body){
            if(err){
                return output(err);
            }
            else{
                console.log("responsecode: "+response.statusCode)
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(body && typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    console.log('body')
                    console.log(body)
                    return output(null, {message: "user added to teams successfully"});
                }
                return output(body);
            }
        })
    };    
}