function DFS(myQueue, discovered, done){
	var temp = myQueue.pop();
	if(temp === end){
		done = true;
		return (myQueue, discovered, done);
	}
	if(!discovered.includes(temp)){
		discovered.push(temp);
		for(var i=0; i<temp.neighbour.length; i++){
			if(!discovered.includes(temp.neighbour[i]) && temp.neighbour[i].wall==false){
				parent.set(temp.neighbour[i],temp);
				myQueue.push(temp.neighbour[i]);
			}
		}
	}
	done = false;
	return (myQueue, discovered, done); 
}