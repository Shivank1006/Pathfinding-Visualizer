function BFS(myQueue, discovered, done){
	var temp = myQueue.shift();
	if(temp === end){
		done = true;
		return (myQueue, discovered, done);
	}
	for(var i=0; i<temp.neighbour.length; i++){
		if(!discovered.includes(temp.neighbour[i]) && temp.neighbour[i].wall==false){
			discovered.push(temp.neighbour[i]);
			parent.set(temp.neighbour[i],temp);
			myQueue.push(temp.neighbour[i]);
		}
	}
	done = false;
	return (myQueue, discovered, done); 
}