module.exports = function(){
    var request = require('request');
    this.id = "freshdesk-user-delete"; 
    this.label = "Create Customer"; 

    this.input = {
      "title": "Delete User",
      "type": "object",
      "properties": {
            "username":{
                "title":"Username",
                "type":"string",
                "minLength":1,
                "description":"Enter Username, ie. john@mysite.com"
            },
            "password":{
                "title":"Password",
                "format":"password",
                "type":"string",
                "minLength":1,
                "description":"Enter password"
            },
            "domains":{
                "title":"Domains",
                "type":"string",
                "description":"Enter Domain ie. Domain_Name.freshdesk.com"
            },
            "id":{
                "title":"Id",
                "type":"string",
                "description":"Enter Id for delete User"
            },
        }
    };


    this.help = "service to delete user";
    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            
       }
    };


    this.execute = function(input,output){
        request({  
            url: "https://"+input.domains+".freshdesk.com/contacts/["+input.id+"].json", 
            method: "DELETE",
            auth: {
                "username":input.username,
                "pass":input.password
            },      
        },function(err,res,body){
            if(err){
                return output(err);
            }
            else{ 
            console.log(err,res.statusCode);               
               if(res.statusCode >= 200 && res.statusCode < 400){
                    return output(null, {deleted:true});
               }
               output(body);
            }
       })
    };
}