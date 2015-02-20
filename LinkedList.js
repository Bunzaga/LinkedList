"use strict";
;(function (window, undefined) {
	function LinkedList(){
		this.first = null;
		this.last = null;
	}
	LinkedList.prototype = {
		constructor:LinkedList,
		addFirst:function(node){
			console.log('addFirst()');
			console.log(node);
			if(null === this.first){
				console.log('null === this.first');
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
		addABeforeB:function(nodeA, nodeB){ // node, member
			if(nodeA === nodeB){return;}
			if(this.first === nodeB){
				this.first = nodeA;
				nodeA.previous = null;
			}
			else{
				nodeA.previous = nodeB.previous;
			}
			nodeA.next = nodeB;
			nodeB.previous = nodeA;
			return this;
		},
		addAAfterB:function(nodeA, nodeB){ // node, member
			if(nodeA === nodeB){return;}
			if(this.last === nodeB){
				this.last = nodeA;
				nodeA.previous = nodeB;
			}
			else{
				nodeA.next = nodeB.next;
			}
			nodeA.previous = nodeB;
			nodeB.next = nodeA;
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
