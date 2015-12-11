var request = require('request');

module.exports = function(){

    this.id = "loggly-log-sending_data"; 
    this.label = "Loggly sending data";

    this.input = { 
      "title": "Loggly sending data",
      "type": "object",
      "properties": {
        "access_token":{
            "title":"Loggly Access Token",
            "type": "string",
            "minLength": 1
        },
        "testdata":{
            "title":"Test Data",
            "type": "string",
            "format": "textarea",
            "description": "Send events and you can test by running your own application",
            "minLength": 1
        }
       
      }
    };
    this.help = "Service to send data in loggly log"
    
    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "message":{
                "title" : "message",
                "type" : "string"            
            }
        }
    };
    this.execute = function(input,output){
        request.post({
            url:"http://logs-01.loggly.com/inputs/"+input.access_token.trim()+"/tag/http/",
            body:input.testdata.trim(),
            json:true
        },function(err,response,body){
            if(err)
            {
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,{message:"log successfylly created"});
                }
                return output(body);
            }
        })
    };
}