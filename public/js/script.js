var aheadData = [];
var editor;
var optionsContainer = {
		required_by_default : true,
        theme: 'bootstrap3',
        schema:{},
        disable_properties: true,
        //disable_array_add : true,
        //disable_array_delete : true,
        disable_array_reorder : true,
        disable_collapse : true,
        disable_edit_json   :true,
        form_name_root : 'ActivityInput',
        iconlib: "fontawesome4"
	};
var optionsValidation = {
	theme: 'bootstrap3',
	ajax: true,
	schema:{
		$ref : 'output.json'
	}
};
var validator, outputDiv, validationResult;
$(function(){
	//OAuth.initialize('bkbMNaZdY_Xu5z-k3dbcm4W0bAU');
    OAuth.initialize('zpnBzhg8v9bGTW2Xvh3I8wwAdLs');
	$('#auth-content').on('hidden.bs.modal', function (e) {
      $('.auth-list .btn').parents('.modal-body').find('.login-box').hide();
    });
	$('.post-level').css('width', 0).hide();
 	$('span.post-close .fa-caret-right').hide();
	$('.post-icon').click(function(){
		if($('.post-icon span').hasClass('post-open')){
            $(this).parents('.post-content').find('.post-level').css({width : "0px"}).hide();
			$('.post-icon span').removeClass('post-open');
			$('span.post-close .fa-caret-left').show();
			$('span.post-close .fa-caret-right').hide();
			$('.post-icon').removeClass('post-icon-open');
		}
		else{
            $(this).parents('.post-content').find('.post-level').css({width : "350px"}).show();
            $('.post-icon span').addClass('post-open');
			$('span.post-close .fa-caret-left').hide();
			$('span.post-close .fa-caret-right').show();
			$('.post-icon').addClass('post-icon-open');
		}
	});

	$('#auth-content').on('hidden.bs.modal', function (e) {
  		$('.auth-list .btn').parents('.modal-body').find('.login-box').hide();
	});	

	
	
	outputDiv = $('.console');
	validationResult = $('.validation-result');

	var reload = function(keep_value) {
        optionsContainer.startval = (editor && keep_value)? editor.getValue() : undefined;
        if(editor) editor.destroy();
        editor = new JSONEditor(element, optionsContainer);
    }

	function validateOutput(data){

		var error = validator.validate(data);
		if(error){
			return {
				"error_message" : "output doesn't matched with schema",
				"error" : error,
				"schema" : validator.schema,
				"output" : data
			};
		}
	}

	function run(){
        console.log('run...');
        outputDiv
            .html("")
            .removeClass('bg-red bg-green');
        var err = editor.validate();
        if(err.length){
            outputDiv
                .removeClass('bg-green')
                .addClass('bg-red')
                .html(JSON.stringify(err));
            return;
        }
		$('.ui-autocomplete-loading').removeClass('hide');
		validationResult
		 .removeClass('color-green color-red')
		 .html('running...');
		
		$('#runButton').toggle(false);
		var data = {};
		data.input = editor.getValue();
		data.$config = {};
		data.$config.auth = angular.element('body').scope().userAuth;
		data.$config.params = angular.element('body').scope().params;
        if($('.select-api-box').length){
            data.selectedApi = $('.select-api-box').first().val();
        }
        if(data.$config.auth.length){
            var auth = {};
            for(var i = 0;i < data.$config.auth.length;i++){
                auth[data.$config.auth[i].name] = data.$config.auth[i].result;
            }
            data.$config.auth = auth;
        }else{
            data.$config.auth = {};
        }
        if(data.$config.params.length){
            var params = {};
            for(var j = 0;j < data.$config.params.length;j++){
                params[data.$config.params[j].key] = data.$config.params[j].value;
            }
            data.$config.params = params;
        }else{
            data.$config.params = {};
        }
		var optionsAjax = {
			url : '/run',
			dataType : 'json',
			method : 'POST',
			processData : false,
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			data : JSON.stringify(data)
		}

		$.ajax(optionsAjax).done(doneCallback).fail(failCallback);
	}

	function doneCallback(responseData){
		$('.ui-autocomplete-loading').addClass('hide');
		$('#runButton').toggle(true);
		var invalid = validateOutput(responseData);
		if(invalid && invalid.length){
			outputDiv
			 .removeClass('bg-green')
			 .addClass('bg-red')
			 .text(JSON.stringify(responseData, null, 2));
			
			validationResult
			 .removeClass('color-green')
			 .addClass('color-red')
			 .html('output validation failed');
			return;
		}
		outputDiv
		 .removeClass('bg-red')
		 .addClass('bg-green')
		 .text(JSON.stringify(responseData, null, 2));

		validationResult
		 .removeClass('color-red')
		 .addClass('color-green')
		 .html('output validation passed');
	}

	function failCallback(responseData){
        console.log('output failed', responseData);
		$('.ui-autocomplete-loading').addClass('hide');
		$('#runButton').toggle(true);
		if(responseData && responseData.responseText){
			responseData = responseData.responseText;
		}
		outputDiv
		 .removeClass('bg-green')
		 .addClass('bg-red')
		 .html(JSON.stringify(responseData, null, 2));

		
		validationResult
		 .removeClass('color-green')
		 .addClass('color-red')
		 .html('output validation failed');
	}

	$('#runButton').on('click', run);
	$('#object_layout').change(function() {
       JSONEditor.defaults.options.object_layout = this.value;
        reload(true);
    });

});

angular.module('adSandbox',[])
.directive('ngApi',function($compile){
    return{
        link:function(scope,element,attrs,ngModel){                
            scope.$watch('json',function(){
                $(element).html("");
                
                if(scope.json.length){
                    var htmlString = "<div class='select-api-ctrl form-group clearfix'><label class='pull-left select-api margin-sides'>Select API</label> <select data-ng-model='selectedApi' class='form-control pull-right select-box select-api-box' data-ng-change='setApi()'>";
                    angular.forEach(scope.json,function(obj,key){
                        htmlString += "<option value='"+obj.id+"'>" + obj.title + "</option>"
                    });
                    htmlString+= "</select>";

                    htmlString+= "</div>";
                    var e = $compile(htmlString)(scope);
                    element.html(e);
                    scope.selectedApi = scope.selectedApi || scope.json[0].id;
                    scope.setApi();
                }
            });
        }
    };
})
.directive('ngRender',function(){
    return{
        link:function(scope,element,attrs,ngModel){
            scope.$watch('input',function(){
	                $(element).html("");
	                if(typeof scope.input.properties == "undefined")
	                    return;
	                optionsContainer.schema = scope.input;
					editor = new JSONEditor(element[0], optionsContainer);
					var validatorElm = $('#validator')[0];
					validator = new JSONEditor(validatorElm, optionsValidation);
	                angular.forEach(scope.input.properties,function(obj,key){
	                   if(obj.addToGlobal){
	                        angular.forEach(scope.configurations,function(configuration){
	                            var value = "";
	                            var addClearance = true;
	                            if(!input[key]){
	                                configuration.params.forEach(function(globalObj){
	                                if(globalObj.key == key)
	                                    addClearance = false;
	                                });
	                                
	                                if(addClearance){
	                                    var gc = {};
	                                    configuration.params.push({'key':key,value:''});
	                                    scope.config_notifications++;
	                                    gc[key] = "{{$config.params." + key + "}}";
	                                    editor.setValue(gc);
	                                }    
	                            }
	                        });
	                    }
                });
                var phase = scope.$root.$$phase;
                  if(phase != '$apply' && phase != '$digest') {
                        scope.$apply();
                  } 
            },true);
        }
    }
})
.directive('tooltip',function(){        
    return{
        link:function(scope,element,attrs){
            element.tooltip({html:true,title:attrs.tooltip});
        }
    };
})
.controller('form1',['$scope','$http',function($scope,$http){
	$scope.authList = [];
	$scope.searchedAuth = "";
	$scope.userAuth = [];
	$scope.params = [];
	$scope.input = {};
	$scope.json = [];
	$scope.selectedApi = "";

	$scope.setApi = function(){
		angular.forEach($scope.json,function(item,index){
            if(item.id == $scope.selectedApi){
                $scope.input = item;
            }
        });
	}

	$scope.attachAuth = function(auth){
        $scope.searchedAuth = auth;
        $scope.authLabel =  auth.name;
        $('.auth-container').hide();
        $('.login-box').show().animate({width: "100%"}, '800');
    };

    $scope.removeAuth = function(index){
    	var tmp = $scope.userAuth.splice(index,1)[0];
    	setTypeHead(tmp,false,true);
        alert("Authentication successfully removed");
    };

    $scope.addGlobal = function(){
    	$scope.params.push({'key': '',value: ''});
    };

    $scope.removeGlobal = function(index){
    	var tmp = $scope.userAuth.splice(index,1);
    	setTypeHead(tmp,false,false);
    };

    $scope.setAhead = function(parameter){
    	setTypeHead(parameter,true,false);
    };

    $scope.setAuth = function(){
    	OAuth.popup($scope.searchedAuth.name,function(error, result) {
    		$('#auth-content').modal('hide');
    		$('.auth-container').show();
        	$('.login-box').hide();
            if(error){
                alert($scope.searchedAuth.title + " authentication failed");
                console.log(error);
            }else{
            	var item = {"name":$scope.authLabel,"result":result,"title":$scope.searchedAuth.title,"type":$scope.searchedAuth.type || $scope.searchedAuth.name};
            	$scope.userAuth.push(item);
                setTypeHead(item,true,true);
            }
            $scope.$apply();
        });
    }

    $scope.getInput = function(){
    	$http({
			url:'/input.json',
			dataType : 'json'
		}).success(function(response, status, headers, config){
			if(response.length){
				$scope.json = response;
			}else{
				$scope.input = response;	
			}
		}).error(function(response, status, headers, config){
			/*console.log(error);*/
		})
    }

	$scope.getOauth = function(){
		$http({
			url:'/oauth',
			dataType : 'json'
		}).success(function(response, status, headers, config){
			$scope.authList = response;
		}).error(function(response, status, headers, config){
			/*console.log(error);*/
		})
	}
}])

function setTypeHead(data,add,auth){
	if(add && auth){
		var objKeys = Object.keys(data.result);
		$.each(objKeys,function(index,item){
			if(typeof data.result[item] != "function"){
				var tmp = "{{$config.auth."+data.name+"."+item+"}}";
				aheadData.push(tmp);		
			}
		});
	}
	if(!add && auth){
		console.log(data);
		var objKeys = Object.keys(data.result);
		$.each(objKeys,function(index,item){
			if(typeof data.result[item] != "function"){
				var tmp = "{{$config.auth."+data.name+"."+item+"}}";
				aheadData.splice(aheadData.indexOf(tmp),1);
			}
		});
	}

	if(add && !auth){
		var tmp = "{{$config.params."+data.key+"}}";
		aheadData.push(tmp);
	}

	if(!add && !auth){
		var tmp = "{{$config.params."+data.key+"}}";
		aheadData.splice(aheadData.indexOf(tmp),1);
	}

    $("#container input[type='text'],input[type='url'],textarea")
        .typeahead('destroy')
        .typeahead({ source:aheadData });
}


