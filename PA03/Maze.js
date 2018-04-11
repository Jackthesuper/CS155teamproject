function createMaze(){
  wall_color = 0xff0000;
  wall_length = 20;
  maze[0] = createMazeWall(wall_color, 100, 0, 0, -45,alongZ=true);

  maze[1] = createMazeWall(wall_color, 90, 45, 0, 30);
//	maze[0].add(maze[1]);
  maze[2]	= createMazeWall(wall_color, 60, 45, 0, 15);
  maze[3] = createMazeWall(wall_color, 100, 45, 0, -50,alongZ=true);
//	maze[1].add(maze[2]);

  maze[4] = createMazeWall(wall_color, 90, 45, 0, 0);
//	maze[1].add(maze[2]);
maze[5] = createMazeWall(wall_color, 90, 45, 0, 0,alongZ=true);
maze[6] = createMazeWall(wall_color, 60, 45, 0, 15);
  var index = 0;
  while(maze[index+1]!=null){
    maze[index].add(maze[index+1]);
    index++;
  }

  scene.add(maze[0]);
}

function createMazeWall(color,length, x, y, z, alongZ = false){
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
  var pmaterial = new Physijs.createMaterial(material,0.9,0.1)
  mesh = new Physijs.BoxMesh(geometry, pmaterial, 0)
  mesh.position.set(x, y, z)
  mesh.castShadow = true;
  return mesh;
}
