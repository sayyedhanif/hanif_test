var request = require('request');
var crypto = require('crypto');

module.exports = function(){

    this.id = "mixpanel-annotation-delete";
    this.label = "Delete Annotation";

    this.input = {
        "title": "Delete Annotation",
        "type": "object",
        "properties": {
            "api_key":{
                "title":"API Key",
                "type": "string",
                "description":"Please enter subdomain of generated loggly account",
                "minLength": 1
            },
            "api_secret":{
                "title":"API Secret",
                "type": "string",
                "description":"Please enter user name",
                "minLength": 1
            },
            "id":{
                "title":"Annotation ID",
                "type": "string",
                "description":"Enter Annotation ID to which delete annotation",
                "minLength": 1
            }        
        }
    };

    this.help = "Service to delete specified annotation";

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
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;   // 60=1 min and 60*60= 1 hour
        var args = "api_key="+ input.api_key +"expire="+expire +"id="+input.id; 
           
        request({              
            method: "POST",
            url: "http://mixpanel.com/api/2.0/annotations/delete",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire,
                id : input.id
            }
        }, function(err,response,body){            
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,{message: "Annotation deleted"});
                }
                return output(body);
            }
        });
    };    
}