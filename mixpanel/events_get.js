var request = require('request');
var crypto = require('crypto');
var obj = {
    "Minute": "minute",
    "Hour": "hour",
    "Day": "day",
    "Week": "week",
    "Month": "month",
    "General": "general",
    "Unique": "unique",
    "Average": "average",
    "JSON": "json",
    "CSV": "csv"
};

module.exports = function(){

    this.id = "mixpanel-events-get";
    this.label = "Get Events";

    this.input = {
        "title": "Get Events",
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
            "event":{
                "title":"Event",
                "type": "string",
                "description":"The event or events(seprated by comma) that you wish to get data for",
                "minLength": 1
            },
            "type":{
                "title":"Type",
                "type": "string",
                "description":"The analysis type you would like to get data for - such as general, unique, or average events",
                "enum":["General", "Unique", "Average"],                
                "minLength": 1
            },
            "unit":{
                "title":"Unit",
                "type": "string",
                "description":"It determines the level of granularity of the data you get back. Note that you cannot get hourly uniques",
                "enum":[ "Minute", "Hour", "Day", "Week","Month"],  
                "minLength": 1
            },
             "interval":{
                "title":"Interval",
                "type": "string",
                "description":"The number of 'units' to return data for - minutes, hours, days, weeks, or months. If unit is day and interval value is 3, it return data for 3 day",
                "minLength": 1
            }
        }
    };

    this.help = "Service to get unique, total, or average data for a set of events over the last N days, weeks, or months";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "legend_size": {
                "title": "legend_size",
                "type": "number"
            },
            "data": {
                "title": "data",
                "type": "object",
                "properties": {
                    "series": {
                        "title": "series",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "properties": {

                            }
                        }
                    },
                    "values": {
                        "title": "values",
                        "type": "object",
                        "properties": {

                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        
        var expire = Math.round(new Date().getTime()/1000) + 60*60;

        input.event = JSON.stringify((input.event).split(','));
        
        var args = "api_key="+ input.api_key +"event="+input.event+"expire="+expire +"interval="+input.interval+"type="+obj[input.type] +"unit="+obj[input.unit]; 
               
        request({              
            method: "GET",
            url: "http://mixpanel.com/api/2.0/events/",
            qs: {
                api_key: input.api_key,
                sig: crypto.createHash('md5').update(args + input.api_secret, 'utf8').digest('hex'),
                expire: expire,
                event : input.event,
                interval: input.interval,
                type: obj[input.type],
                unit: obj[input.unit]
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