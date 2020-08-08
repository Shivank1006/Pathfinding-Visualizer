function removeFromArray(arr, elt){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i] == elt){
			arr.splice(i, 1);
		}
	}
}


function heuristic(a, b){
	var d = dist(a.i, a.j, b.i, b.j);
	return d;
}


function Astar(openSet, ClosedSet, done){
    var winner = 0;
	if(openSet.length > 0){
		for(var i=0; i<openSet.length ; i++){
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}
		var current = openSet[winner];
		if(openSet[winner] == end){
			path = [];
			var temp = current;
			path.push(temp);
			while(temp.previous){
				path.push(temp.previous);
				temp = temp.previous;
			}
			done = true;
			return(openSet, ClosedSet, done)
		}
		removeFromArray(openSet, current);
		ClosedSet.push(current);
		
		var neighbors = current.neighbour;
		for(var i=0; i<neighbors.length; i++){
			if(!ClosedSet.includes(neighbors[i]) && ! neighbors[i].wall){
				var tempG = current.g + 1;
				var newPath = false;
				
				if(openSet.includes(neighbors[i])){
					if(tempG < neighbors[i].g){
						neighbors[i].g = tempG;
						newPath = true;
					}
				}else{
					neighbors[i].g = tempG;
					newPath = true;
					openSet.push(neighbors[i]); 
				}
				if(newPath){
					neighbors[i].h = heuristic (neighbors[i], end);
					neighbors[i].f = neighbors[i].g + neighbors[i].h;
					neighbors[i].previous = current;
				}
					
			}
		}
					
	}else{
		done = false;
		return (openSet, ClosedSet, done);
	}
				
}
