var express = require("express"),
    bodyParser = require('body-parser'),
    request = require("request"),
    util = require("util"),
    app = express(),
    fs = require("fs"),
    path = require("path"),
    errorhandler = require('errorhandler');

if(process.argv.length <= 2){
    var prompt = require('cli-prompt');
    prompt('Enter activity filename: ', function(name){
        process.argv.push(name);
        init();
    });
}else{
    init();
}
var ai;
function init(){

    var userFile = path.join(__dirname, process.argv[2]);

    var act = require(userFile);
    ai = new act();

    require('http').globalAgent.maxSockets = 50;
    require('https').globalAgent.maxSockets = 50;

    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS,HEAD");
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-Requested-With, master_key, Content-Type");
        res.header("Access-Control-Max-Age","1728000");
        res.header("X-Powered-By","RAW Application FrameWork");
        if ('OPTIONS' === req.method) {
            return res.send(200);
        }
        next();
    });

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());
    app.use(errorhandler());

    app.get('/input.json', getInputSchema);
    app.get('/output.json', getOutputSchema);
    app.post('/run', runActivity);
    app.get('/oauth',getOauth);


    app.listen(7999, function(){
    	console.log('Activity development sandbox is running on port : 7999');
    	setTimeout(function(){
    		require('open')('http://localhost:7999');
        },500);

    });
}

function getOauth(req,res){
	var options = {
		method:'get',
		url:'http://flow.cloudthis.com/oauth',
		'auth': {
    		'user': 'builtflow',
    		'pass': 'raweng123',
    		'sendImmediately': true
  		}
	};

	request(options,function(error,response,body){
		res.send(body);
	})
}

function runActivity(req, res){
    var input = interpolateString(req.body.input, req.body);
    console.log('executed....');
    req.body.$api = req.body.selectedApi;
    try{
        ai.execute.call(req.body, input, function(err, data){
            if(err){
                return res.send(400, JSON.stringify(err));
            }
            if(data && typeof(data) === "object"){
                return res.json(200, data);
            }else{
                return res.send(200, data);
            }
        });
    }catch(e){
        res.send(400, JSON.stringify(e.stack));
    }

}

function interpolateString(inputObj, executionSpace){
    if(!inputObj || inputObj === null || typeof inputObj === "undefined"){
        return inputObj;
    }else if(util.isArray(inputObj)){
        for(var i=0; i < inputObj.length; i++){
            inputObj[i] = interpolateString(inputObj[i], executionSpace);
        }
    }else if(typeof inputObj === "object"){
        for(var item in inputObj){
            inputObj[item] = interpolateString(inputObj[item], executionSpace);
        }
    }else if(inputObj && typeof inputObj.toString === "function"){
        inputObj = inputObj.toString();
        var match = inputObj.match(/{{([^{}]+)}}/g);
        if(match){
            if(match.length > 1){
                var intObj;
                var fullText = true;
                for(var z=0;z < match.length;z++){
                    intObj = executionSpace ;
                    match[z] = match[z].substr(2, match[z].length-4);
                    match[z].split('.').forEach(function(item){
                        if(typeof intObj !== "undefined"){
                            intObj = intObj[item.trim()];
                        }
                    });
                    if(typeof intObj === "object"){
                        fullText = false;
                        break;
                    }
                }
                if(fullText){
                    return inputObj.replace(/{{([^{}]+)}}/g,
                        function (a, b) {
                            intObj = executionSpace ;
                            b.split(".").forEach(function(item){
                                if(typeof intObj !== 'undefined'){
                                    intObj=intObj[item.trim()];
                                }
                            });
                            return ((typeof intObj).match(/number|string/g) ? intObj : a) ;
                        }
                    );
                }

            }
            var interObject = executionSpace ;
            match = inputObj.match(/{{([^{}]+)}}/);
            match[1].split('.').forEach(function(item){
                if(interObject){
                    interObject = interObject[item.trim()];
                }
            });
            inputObj = typeof interObject != 'undefined' ? interObject : inputObj ;
        }
    }
    return inputObj;
};

function getInputSchema(req, res){
	return res.json(200, ai.input);
}

function getOutputSchema(req, res){
	return res.json(200, ai.output);
}

