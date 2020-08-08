function Spot(i, j){
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbour = [];
	this.previous = undefined;
	
	this.wall = false;
	
	this.show = function(col){
		fill(col);
		if(this.wall){
			fill(0);
		}
		
		stroke(217, 199, 255);
		strokeWeight(1);
		rect(this.i*w, this.j*w, w, w);
	}

	this.startShow = function(){
		push();
		fill(0, 209, 52, 127);
		translate(this.i*w + w/2, this.j*w + w/2);
		noStroke();
		for (let p = 0; p < 10; p++) {
			ellipse(0, 5, 7, 20);
			rotate(PI/5);
		}
		pop();
	}

	this.endShow = function(){
		push();
		fill(245, 66, 191, 127);
		translate(this.i*w + w/2, this.j*w + w/2);
		noStroke();
		for (let p = 0; p < 10; p++) {
			ellipse(0, 5, 7, 20);
			rotate(PI/5);
		}
		pop();
	}
	
	this.addNeighbour = function(grid){
		var dr = [-1, 0, 1, 0];
		var dc = [0, 1, 0, -1];
		for(var p=0; p<4; p++){
			var rr = i + dr[p];
			var cc = j + dc[p];
			if(rr<0 || cc<0){
				continue;
			}
			if(rr>cols-1 || cc>rows-1){
				continue;
			}
			this.neighbour.push(grid[rr][cc])
		}
		// if(i < cols-1){
		// 		this.neighbour.push(grid[this.i+1][this.j])
		// }
		// if(i > 0){
		// 		this.neighbour.push(grid[this.i-1][this.j ])
		// }
		// if(j<rows-1){
		// 	this.neighbour.push(grid[this.i ][this.j+1])
		// }
		// if(j>0){
		// 	this.neighbour.push(grid[this.i ][this.j-1])
		// }
		// if(i>0 && j>0){
		// 				this.neighbour.push(grid[this.i-1][this.j-1])
		// }
		// if(i<cols-1 && j<rows-1){
		// 				this.neighbour.push(grid[this.i+1][this.j+1])
		// }
		// if(i<cols-1 && j>0){
		// 				this.neighbour.push(grid[this.i+1][this.j-1])
		// }
		// if(i>0 && j<rows-1){
		// 				this.neighbour.push(grid[this.i-1][this.j+1])
		// }
	}
				
}
