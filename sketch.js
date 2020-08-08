var cols;
var grid= new Array(cols);
var w = 29 ;

// for Astar
var openSet = [];
var closedSet = [];

// for BFS
var discovered = [];
var myQueue = [];
var parent = new Map();

var start;
var end;
let canvas;

var moveStart = false;
var moveEnd = false;

var path = [];

var done = undefined;
var visualize = false;
let clearAll;
let clearPath;

function setup(){
	cols = int(windowWidth / w)
	rows = int((windowHeight * 0.90)/w);

	canvas = createCanvas(cols*w, rows*w);
	canvas.parent('#canvas');

	for(let i=0; i<cols; i++){
		grid[i] = new Array(rows);
	}
				 	
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j] = new Spot(i, j);
		}
	}
	
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j].addNeighbour(grid);
		}
	}
	
	start = grid[floor(cols/4)][10];
	end = grid[floor(3*cols/4)][10];
	start.wall = false;
	end.wall = false;	
}

function draw(){
	background(255);

	//Show the grid
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j].show(255);
		}
	}

	// Moving the start node
	if(visualize == false && moveStart == true){
		if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
			var x = mouseX/w;
			var y = mouseY/w;
			if(grid[int(x)][int(y)] != end && grid[int(x)][int(y)].wall==false){
				start = grid[int(x)][int(y)];
				start.wall = false;
			}
		}
	}

	// Moving the end node
	if(visualize == false && moveEnd == true){
		if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
			var x = mouseX/w;
			var y = mouseY/w;
			if(grid[int(x)][int(y)] != start && grid[int(x)][int(y)].wall==false){
				end = grid[int(x)][int(y)];
				end.wall = false;
			}
		}
	}

	//Astar Algorithm
	if(myFunction() == "Astar"){
		if(visualize == true){
			openSet, closedSet, done = Astar(openSet, closedSet, done);
		}

		for(let i=0; i<closedSet.length; i++){
			if(closedSet[i] === start || closedSet[i] === end){
				continue;
			}
			closedSet[i].show(color(255, 51, 51, 150));
		}

		for(let i=0; i<openSet.length; i++){
			if(openSet[i] === start || openSet[i] === end){
				continue;
			}
			openSet[i].show(color(0, 255, 0, 150));
		}
	}

	//BFS Algorithm
	if(myFunction() == "BFS"){
		if(visualize == true && done!=true){
			if(myQueue.length > 0){
				myQueue, discovered, done = BFS(myQueue, discovered, done);
			}
		}
		//Visualizing the path
		if(done == true){
			path = [];
			let temp = end;
			path.push(temp);
			while(temp!==start){
				path.push(parent.get(temp));
				temp = parent.get(temp);
			}
		}
		for(let i=0; i<discovered.length; i++){
			if(discovered[i] === start || discovered[i] === end){
				continue;
			}
			discovered[i].show(color(255, 51, 51, 150));
		}

		for(let i=0; i<myQueue.length; i++){
			if(myQueue[i] === start || myQueue[i] === end){
				continue;
			}
			myQueue[i].show(color(0, 255, 0, 150));
		}
	}


	//DFS Algorithm
	if(myFunction() == "DFS"){
		if(visualize == true && done!=true){
			if(myQueue.length > 0){
				myQueue, discovered, done = DFS(myQueue, discovered, done);
			}
		}

		if(done == true){
			path = [];
			let temp = end;
			path.push(temp);
			while(temp!==start){
				path.push(parent.get(temp));
				temp = parent.get(temp);
			}
		}
		for(let i=0; i<discovered.length; i++){
			if(discovered[i] === start || discovered[i] === end){
				continue;
			}
			discovered[i].show(color(255, 51, 51, 150));
		}
	}
	
	//Show the start and end nodes
	start.startShow();
	end.endShow();
	
	// Visualize the shortest path
	if(visualize == true){
		if(done == true){
			noFill();
			stroke(47, 60, 204);
			strokeWeight(w/8);
			beginShape();
			for(let p=0; p<path.length; p++){
				vertex(path[p].i*w + w/2, path[p].j*w + w/2);
			}
			endShape();
		}
	}
}

function startAlgo(){
	clear_Path();
	visualize = true;
	if(myFunction() == "Astar"){
		openSet = [start];
	}else if(myFunction() == "BFS"){
		myQueue = [start];
	}else if(myFunction() == "DFS"){
		myQueue = [start];
	}
}


function clear_All(){
	clear_Path();	
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j].wall = false;
		}
	}
}

function clear_Path(){
	visualize = false;
	done = false;
	path = [];
	if(myFunction() == "Astar"){
		openSet = [];
		closedSet = [];
	}else if(myFunction() == "BFS"){
		discovered = [];
		myQueue = [];
	}else if(myFunction() == "DFS"){
		discovered = [];
		myQueue = [];
	}
}


// Generate a random maze
function randomMaze(){
	clear_All();
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			if(visualize===false && random(1)<0.3){
				grid[i][j].wall = true;
			}
		}
	}
	start.wall = false;
	end.wall = false;
}


// Mouse functions

function mousePressed(){
	if(floor(mouseX/w) == start.i && floor(mouseY/w)==start.j){
		moveStart = true;
	}else if(floor(mouseX/w) == end.i && floor(mouseY/w)==end.j){
		moveEnd = true;
	}else if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
		grid[floor(mouseX/w)][floor(mouseY/w)].wall = true;
	}
}

function mouseReleased(){
	moveStart = false;
	moveEnd = false;
}

function mouseDragged(){
	if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
		var x = mouseX / w;
		var y = mouseY / w;
		if(grid[int(x)][int(y)] != start && grid[int(x)][int(y)] != end && moveStart==false && moveEnd==false){
			grid[int(x)][int(y)].wall = true;
		}
	}
}