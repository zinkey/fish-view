;(function(env){
	var FishView = function(obj){ 
		var self = this;
		this.render = function(){
			obj.render&&obj.render.call(self);
			return self;
		};
		this.setTemplate(obj.template);
		this.setData(obj.data);
	};
	FishView.prototype = {
		setTemplate:function(template){
			if (typeof template == "function"){
				var tag = new Date - Math.random();
				this.templatetag = tag;
				var self = this;
				var obj = {};
				for (var i in this){
					if (typeof this[i] == "function"){
						obj[i] = (function(i){
							return function(){
								var array = Array.prototype.slice.call(arguments);
								if (i == "setTemplate"){
									array.push(tag);
								}
								self[i].apply(self,array);
								return self;
							}
						})(i);
					}
				}
				template.call(obj);
				return this;
			}	
			if (arguments[1] && arguments[1] != this.templatetag){
				return this;
			}
			this.template = template;
			if (this.data){
				this.render.call(this,this.template,this.data);
			}
			return this;
		},
		setData:function(data){
			if (typeof data == "function"){
				var tag = new Date - Math.random();
				this.datatag = tag;
				var self = this;
				var obj = {};
				for (var i in this){
					if (typeof this[i] == "function"){
						obj[i] = (function(i){
							return function(){
								var array = Array.prototype.slice.call(arguments);
								if (i == "setData"){
									array.push(tag);
								}
								self[i].apply(self,array);
								return self;
							}
						})(i);
					}
				}
				data.call(obj);
				return this;
			}	
			if (arguments[1] && arguments[1] != this.datatag){
				return this;
			}
			this.data = data;
			if (this.template){
				this.render.call(this,this.template,this.data);
			}
			return this;
		}
	};
	env.FishView = FishView;
})(window);