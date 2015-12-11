var request = require('request');

module.exports = function(){

    this.id = "jotform-user-report"; 
    this.label = "Users Form Report"; 

    this.input = { 
        "title": "Users Form Report",
        "type": "object",
        "properties": {       
            "apikey":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            }          
        }
    };
    this.help = "Service to get users form report"    

    this.output = {
        "type": "object",
        "properties":{
            "responseCode": {
                "title":"responseCode",
                "type":"integer"
            },
            "message": {
                "title":"message",
                "type":"string"
                
            },
            "content": {
                "title": "title",
                "type": "array"
            },
            "duration": {
                "title":"duration",
                "type":"string"
            },
            "limit-left": {
                "title":"limit-left",
                "type":"integer"
            }
        }
    };

    this.execute = function(input,output){

        request.get({
            url:'https://api.jotform.com/user/reports?apiKey='+input.apikey.trim()

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
                    return output(null,body);
                }
                return output(body);
            }           
        })
    };    
}

