var request = require('request');

module.exports = function(){

    this.id = "beanstalk-repo-details";
    this.label = "Repository Details";

    this.input = {
        "title": "Repository Details",
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
            },
            "repo_id": {
                "title": "Repository Id",
                "type": "string",
                "description":"Enter repository id",
                "minLength": 1
            }
        }
    };

    this.help = "Service to to get repository details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
                "repository": {
                    "title": "repository",
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "integer"
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
                        "title": {
                            "title": "title",
                            "type": "string"
                        },
                        "color_label": {
                            "title": "color_label",
                            "type": "string"
                        },
                        "storage_used_bytes": {
                            "title": "storage_used_bytes",
                            "type": "integer"
                        },
                        "last_commit_at": {
                            "title":"last_commit_at",
                            "type": "string"
                        },
                        "type": {
                            "title": "type",
                            "type" :"string"
                        },
                        "default_branch": {
                            "title": "default_branch",
                            "type": "string"
                        },
                        "vcs": {
                            "title": "vcs",
                            "type": "string"
                        },
                        "repository_url": {
                            "title": "repository_url",
                            "type": "string"
                        },
                        "repository_url_https": {
                            "title": "repository_url_https",
                            "type": "string"
                        },
                        "public_key": {
                            "title": "public_key",
                            "type": "string"
                        }
                    }
                }
        }
    };

    this.execute = function(input,output){
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/repositories/'+input.repo_id.trim()+'.json';
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
                    return output(null, body);
                }
                return output(body);
            }
        })
    };    
}