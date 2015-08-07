"use strict";
;(function (window, undefined) {
	function LinkedList(){
		this.first = null;
		this.last = null;
	}
	LinkedList.prototype = {
		constructor:LinkedList,
		addFirst:function(node){
			if(null === this.first){
				this.first = node;
				this.last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				node.next = this.first;
				this.first.previous = node;
				this.first = node;
			}
			return this;
		},
		addLast:function(node){
			if(null === this.first){
				this.first = node;
				this.last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				this.last.next = node;
				node.previous = this.last;
				node.next = null;
				this.last = node;
			}
			return this;
		},
		addSorted:function(node){
			if(null === this.first){
				this.first = node;
				this.last = node;
				node.next = null;
				node.previous = null;
			}
			else{
				var n = this.last;
				while(n !== null){
					if(n.priority <= node.priority){
						break;
					}
					n = n.previous;
				}
				// add to the end of the list
				if(n === this.last){
					this.last.next = node;
					node.previous = this.last;
					node.next = null;
					this.last = node;
				}
				// add to the front of the list
				else if(null === n){
					node.next = this.first;
					node.previous = null;
					this.first.previous = node;
					this.first = node;
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
		addBefore:function(member, newNode){
			if(member === newNode){return;}
			if(this.first === member){
				this.first = newNode;
				newNode.previous = null;
			}
			else{
				newNode.previous = member.previous;
				newNode.previous.next = newNode;
			}
			newNode.next = member;
			member.previous = newNode;
			return this;
		},
		addAfter:function(member, newNode){ // member, newNode
			if(newNode === member){return;}
			if(this.last === member){
				this.last = newNode;
				newNode.previous = member;
			}
			else{
				newNode.next = member.next;
				newNode.next.previous = newNode;
			}
			newNode.previous = member;
			member.next = newNode;
			return this;
		},
		contains:function(node){
			var n = this.first;
			while(n !== null){
				if(n === node){return true;}
				n = n.next;
			}
			return false;
		},
		remove:function(node){
			if(this.first === node){
				this.first = this.first.next;
			}
			if(this.last === node){
				this.last = this.last.previous;
			}
			if(node.previous !== null){
				node.previous.next = node.next;
			}
			if(node.next !== null){
				node.next.previous = node.previous;
			}
			node.next = null;
			node.previous = null;
			return this;
		},
		clear:function(){
			var node;
			while(null !== this.first){
				node = this.first;
				this.first = node.next;
				node.previous = null;
				node.next = null;
			}
			this.last = null;
		}
	};
	window.LinkedList = LinkedList;
}(window));
