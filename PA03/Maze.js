//this method is called in main scene, too c
function createMaze(){
  wall_color = 0xff0000;
  var lengthRecord;
  //wall_length = 20;
  //I initialize all maze Wall with even index as alongZ and all maze wal with odd index as alongZ=false
  maze[0] = createMazeWall(wall_color, 100,alongZ=true);
  maze[0].position.set(0, 0, -50);

  maze[1] = createMazeWall(wall_color, 90);
  crrLength = 100;
  nextLength =100;
  //left to right: crr, next, crrAlongZ, nextLength, attach on the positive axis side, crrLength, attach position.
  setPosition(maze[0],maze[1],true,nextLength,true,crrLength,10);
//	maze[0].add(maze[1]);
  maze[2]	= createMazeWall(wall_color, 100);
  crrLength=nextLength;
  nextLength =100;
  setPosition(maze[1],maze[2],false,nextLength,false,crrLength,4);

  maze[3] = createMazeWall(wall_color, 100, alongZ=true);
  crrLength = nextLength;
  nextLength =100;
  setPosition(maze[2],maze[3],true,nextLength,false,crrLength,4);

  maze[4] = createMazeWall(wall_color, 100);
  crrLength = nextLength;
  nextLength =100;
  setPosition(maze[3],maze[4],false,nextLength,false,crrLength,3);
//	maze[1].add(maze[2]);
  maze[5] = createMazeWall(wall_color, 90, 45, 0, 0,alongZ=true);
  maze[6] = createMazeWall(wall_color, 60, 45, 0, 15);
  //stick all of the maze wall together.
  var index = 0;
  while(maze[index+1]!=null){
    maze[index].add(maze[index+1]);
    index++;
  }

  scene.add(maze[0]);
}

// function crrAlongZ(index){
// 	if(index%2==0){
// 		return true;
// 	}
// 	return false;
// }
function setPosition(crr,next,crrAlongZ,nextLength,poSide,crrLength,attP){
  if(crrAlongZ){
    if(poSide){
      next.position.x=crr.position.x+nextLength/2+2.5;
    }else{
      next.position.x=crr.position.x-nextLength/2-2.5;
    }
    next.position.z= crr.position.z+crrLength/2-attP*5-2.5;
  }else{
    if(poSide){
      next.position.z=crr.position.z+nextLength/2+2.5;
    }else{
      next.position.z=crr.position.z-nextLength/2-2.5;
    }
    next.position.x= crr.position.x+crrLength/2-attP*5-2.5;
  }
  next.position.y = crr.position.y;
  return;
}

function createMazeWall(color,length,alongZ = false){
  var geometry;
  if(alongZ){
  geometry = new THREE.BoxGeometry(grid_width, wall_height, length)
  }
  else{
  geometry = new THREE.BoxGeometry(length, wall_height, grid_width)
  }

  var texture = new THREE.TextureLoader().load( '../images/'+'B04.png' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  var material = new THREE.MeshLambertMaterial( { color: color,  map: texture ,side:THREE.DoubleSide} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.5)
  mesh = new Physijs.BoxMesh(geometry, pmaterial, 0)
  //mesh.position.set(x, y, z)
  mesh.castShadow = true;
  return mesh;
}
