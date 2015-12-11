var request = require('request');
var crypto = require('crypto');
var  obj = {
    "General": "general",
    "Unique": "unique",
    "Average": "average",
};

module.exports = function(){

    this.id = "mixpanel-funnels-detail";
    this.label = "Get Funnel Detail";

    this.input = {
        "title": "Get Funnel Detail",
        "type": "object",
        "properties": {
            "api_key":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            },
            "api_secret":{
                "title":"API Secret",
                "type": "string",
                "minLength": 1
            },
            "funnel_id":{
                "title":"Funnel ID",
                "type": "string",
                "description":"The funnel that you wish to get data for",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get data for a specified funnel";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "meta": {
                "title": "meta",
                "type": "object",
                "properties": {
                    "dates": {
                        "title": "dates",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "properties": {

                            }
                        }
                    }
                }
            },
            "data": {
                "title": "data",
                "type": "object",
                "properties": {
                    
                }
            }
        }
    };

    this.execute = function(input,output){
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;

        var args = "api_key="+ input.api_key +"expire="+expire +"funnel_id="+input.funnel_id    
                
        request({              
            method: "GET",
            url: "http://mixpanel.com/api/2.0/funnels/",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire,
                funnel_id: input.funnel_id
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
                    return output(null,body);
                }
                return output(body);
            }
        });
    };    
}