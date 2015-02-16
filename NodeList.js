"use strict";
;goo.define([], function(){
	function NodeList(){};
	NodeList.prototype = {
		addFirst:function(node){
			if(null === this._first){
				this._first = node;
				this._last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				node.next = this._first;
				this._first.previous = node;
				this._first = node;
			}
			return this;
		},
		addLast:function(node){
			if(null === this._first){
				this._first = node;
				this._last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				this._last.next = node;
				node.previous = this._last;
				node.next = null;
				this._last = node;
			}
			return this;
		},
		addSorted:function(node){
			if(null === this._first){
				this._first = node;
				this._last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				var n = this._last;
				while(n !== null){
					if(n.priority <= node.priority){
						break;
					}
					n = n.previous;
				}
				// add to the end of the list
				if(n === this._last){
					this._last.next = node;
					node.previous = this._last;
					node.next = null;
					this._last = node;
				}
				// add to the front of the list
				else if(null === n){
					node.next = this._first;
					node.previous = null;
					this._first.previous = node;
					this._first = node;
				}
				// add behind the same or lower priority
				else{
					node.next = n.next;
					node.previous = n;
					n.next.previous = node;
					n.next = node;
				}
			}
			return this;
		},
		remove:function(node){
			if(this._first === node){
				this._first = this._first.next;
			}
			if(this._last === node){
				this._last = this._last.previous;
			}
			if(node.previous !== null){
				node.previous.next = node.next;
			}
			if(node.next !== null){
				node.next.previous = node.previous;
			}
			return this;
		},
		clear:function(){
			var node;
			while(null !== this._first){
				node = this._first;
				this._first = node.next;
				node.previous = null;
				node.next = null;
			}
			this._last = null;
		}
	};
	NodeList.prototype.constructor = NodeList;
	Object.defineProperties(NodeList.prototype, {
		first:{
			get: function(){
				return this._first || (this._first = null);
			},
			set: function(){
				return this._first || (this._first = null);
			}
		},
		last:{
			get: function(){
				return this._last || (this._last = null);
			},
			set: function(){
				return this._last || (this._last = null);
			}
		}
	});
//	var global = global || window;
//	global.NodeList = NodeList;
	return NodeList;
});
