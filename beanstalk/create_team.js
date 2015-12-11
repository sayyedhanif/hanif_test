var request = require('request');

var colorObj = {
    "No color label":"white",
    "Pink":"pink",
    "Red":"red",
    "Red Orange":"red-orange",
    "Orange":"orange",
    "Yellow":"yellow",
    "Yellow Green":"yellow-green",
    "Aqua Green":"aqua-green",
    "Green":"green",
    "Green Blue":"green-blue",
    "Sky Blue":"sky-blue",
    "Light Blue":"light-blue",
    "Blue":"blue",
    "Orchid":"orchid",
    "Violet":"violet",
    "Brown":"brown",
    "Black":"black",
    "Grey":"grey"
}

module.exports = function(){

    this.id = "beanstalk-team-create";
    this.label = "Create Team";

    this.input = {
        "title": "Create Team",
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
                "title":"Team Name",
                "type": "string",
                "description":"Enter name of your team",
                "minLength": 1
            },
            "color_label": {
                "title": "Color label",
                "type": "string",
                "description":"Enter color label used for your team on the UI",
                "enum": [
                    "No color label",
                    "Pink",
                    "Red",
                    "Red Orange",
                    "Orange",
                    "Yellow",
                    "Yellow Green",
                    "Aqua Green",
                    "Green",
                    "Green Blue",
                    "Sky Blue",
                    "Light Blue",
                    "Blue",
                    "Orchid",
                    "Violet",
                    "Brown",
                    "Black",
                    "Grey"
                ]
            },
            "users":{
                "title": "Users",
                "type": "array",
                "description": "An array of User ID’s",
                "items": {
                    "type": "string"
                }
            },
            "permissions" :{
                "title": "permissions",
                "type": "array",
                "description":"Hash of repository ID’s mapped to permissions",
                "items": {
                    "type": "object",
                    "properties": {
                        "repository_id": {
                            "title": "Repository id",
                            "type": "string",
                            "description":"Enter repository id",
                            "minLength": 1
                        },
                        "access": {
                            "title": "Access",
                            "type": "string",
                            "description":"Enter team access permissoin for this repository",
                            "enum": [
                                "Read-only",
                                "Read & Write"
                            ]

                        },
                        "deployments": {
                            "title": "Deployments",
                            "type": "string",
                            "description":"Enter team deployments permissoin for this repository",
                            "enum": [
                                "View Activity",
                                "View & Deploy",
                                "Full Access"
                            ]
                        }
                    }
                }
            }          
        }
    };

    this.help = "Service to create teams";

    this.output = {
        "title": "output",
        "type": "object",
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
                    },
                    "users": {
                        "title": "users",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {

                            }
                        }
                    },
                    "permissions": {
                        "title": "permissions",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        var permissionsObject = {};

        input.permissions.forEach(function(elem,i) {
            elem.write = elem.access == "Read & Write" ? true : false;

            if(elem.deployments == "View Activity"){
                elem.deploy = false;
                elem.configure_deployments = false;
            }else{
                if(elem.deployments == "View & Deploy"){
                    elem.deploy = true;
                    elem.configure_deployments = false;

                }else{
                    elem.deploy = false;
                    elem.configure_deployments = true;

                }
            }

            permissionsObject[elem.repository_id] = {
                    "write":elem.write,
                    "deploy":elem.deploy,
                    "configure_deployments":elem.configure_deployments
            };


        });

        console.log('permissionsObject');
        console.log(permissionsObject)
        
        var URL = 'http://'+input.username.trim()+':'+input.token.trim()+'@'+input.account.trim()+'.beanstalkapp.com/api/teams.json';
        request.post({
            url:URL,
            json: { 
                "name": input.name.trim(),
                "color_label": colorObj[input.color_label],
                "users": input.users,
                "permissions": permissionsObject
            },
            json:true
        }, function(err, response, body){
            if(err){
                return output(err);
            }
            else{
                console.log("responsecode: "+response.statusCode)
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    console.log('body')
                    console.log(body)
                    return output(null, body);
                }
                return output(body);
            }
        })
    };    
}