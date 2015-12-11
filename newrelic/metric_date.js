var request = require('request');

module.exports = function(){

    this.id = "newrelic-application-metric-data-get";

    this.label = "Get Metric Details";

    this.input = {
        "title": "Get Metric Details",
        "type": "object",
        "properties": {
            "apiKey": {
                "type": "string",
                "title": "New Relic API Key",
                "minLength": 1
            },
            "appID": {
                "type": "string",
                "title": "Application ID",
                "minLength": 1,
                "description": "Enter application id"
            },
            "names": {
                "type": "string",
                "title": "Metric Name",
                "minLength": 1,
                "description": "Retrieve specific metrics by name[], comma seprated name for more metric"
            },
            "values": {
                "type": "string",
                "title": "Values",
                "description": "Retrieve specific metric values"
            },
            "from": {
                "type": "string",
                "title": "From (YYYY-MM-DD)",
                "description": "Retrieve metrics after this time"
            },
            "to": {
                "type": "string",
                "title": "To (YYYY-MM-DD)",
                "description": "Retrieve metrics before this time"
            },
            "summarize": {
                "type": "boolean",
                "title": "Summarize"
            }
        }
    };

    this.help = "This activity get details of particular metric";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "metric_data": {
                "title": "metric_data",
                "type": "object",
                "properties": {
                    "from": {
                        "title": "from",
                        "type": "string"
                    },
                    "to": {
                        "title": "to",
                        "type": "string"
                    },
                    "metrics": {
                        "title": "metrics",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "title": "name",
                                    "type": "string"
                                },
                                "timeslices": {
                                    "title": "timeslices",
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "to": {
                                                "title": "to",
                                                "type": "string"
                                            },
                                            "from": {
                                                "title": "from",
                                                "type": "string"
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
                            }
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {
        console.log('names[]:'+ input.names)


//         console.log('names[
    
// ]: '+input.names)input.names=input.names.split(',
// ');varmetricParams={
//     "names[]": input.names[
//         0
//     ]
// };for(vari=1;i<input.names.length;i++){
//     metricParams[
//         'names[
            
//         ]'
//     ]=input.names[
//         i
//     ]
// }if(input.values)metricParams[
//     '&values[
        
//     ]'
// ]=input.values;if(input.from)metricParams[
//     '&from'
// ]=input.from;if(input.to)metricParams[
//     '&to'
// ]=input.to;if(input.summarize)metricParams[
//     '&summarize'
// ]=input.summarize;console.log('metricParams: ')console.log(metricParams)

        input.names = input.names.split(',');
        var metricParams = 'names[]='+ input.names[0];
        for (var i= 1; i< input.names.length; i++){
            metricParams+= '&names[]='+input.names[i]
        }

        if (input.values)
            metricParams+= '&values[]='+ input.values;
        if (input.from)
            metricParams+= '&from='+ input.from;
        if (input.to)
            metricParams+= '&to='+ input.to;
        if (input.summarize)
            metricParams+= '&summarize='+ input.summarize;
        console.log('metricParams:'+ metricParams)

        request({
            method :'GET',
            headers : {
                "X-Api-Key": input.apiKey
            },
            url: "https://api.newrelic.com/v2/applications/"+input.appID+"/metrics/data.json",
            body: metricParams
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};