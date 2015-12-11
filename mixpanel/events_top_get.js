var request = require('request');
var crypto = require('crypto');
var  obj = {
    "General": "general",
    "Unique": "unique",
    "Average": "average",
};

module.exports = function(){

    this.id = "mixpanel-events-top-get";
    this.label = "Get Top Events";

    this.input = {
        "title": "Get Top Events",
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
            "type":{
                "title":"Type",
                "type": "string",
                "enum":["General", "Unique", "Average"],       
                "description":"The analysis type you would like to get data for - such as general, unique, or average events",
                "minLength": 1
            },
            "limit":{
                "title":"Limit",
                "type": "string",
                "description":"The maximum number of events to return. Defaults to 100"
            }
        }
    };

    this.help = "Service to get the top events for today, with their counts and the normalized percent change from yesterday";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "events": {
                "title": "events",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "amount": {
                            "title": "amount",
                            "type": "number"
                        },
                        "percent_change": {
                            "title": "percent_change",
                            "type": "number"
                        },
                        "event": {
                            "title": "event",
                            "type": "string"
                        }
                    }
                }
            },
            "type": {
                "title": "type",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;
        var params= {
            api_key: input.api_key,
            expire: expire,
            type : obj[input.type]            
        };
        var args;
        
        if(input.limit){
            args = "api_key="+ input.api_key +"expire="+expire +"limit="+input.limit +"type="+obj[input.type];
            params.limit = input.limit
        }else{
            args = "api_key="+ input.api_key +"expire="+expire +"type="+input.type;
        }

        params.sig = crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex');
                
        request({              
            method: "GET",
            url: "http://mixpanel.com/api/2.0/events/top/",
            qs: params
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