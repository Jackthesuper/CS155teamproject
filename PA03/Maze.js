//this method is called in main scene, too c
function createMaze(){
  wall_color = 0xff0000;
  var lengthRecord;
  //wall_length = 20;
  //I initialize all maze Wall with even index as alongZ and all maze wal with odd index as alongZ=false
  crrLength=0;
  nextLength =500;
  maze[0] = createMazeWall(wall_color,nextLength,alongZ=true);
  maze[0].position.set(0, 0, -nextLength/2);
  maze[0].length = 500
  crrLength = nextLength;


  nextLength =110;
  maze[1] = createMazeWall(wall_color, nextLength);
  //left to right: crr, next, crrAlongZ, nextLength, attach on the positive axis side, crrLength, attach position.
  //setPosition(maze[0],maze[1],true,nextLength,true,crrLength,3);
  maze[1].position.set(maze[0].position.x+nextLength/2+2.5,maze[0].position.y,-100);//for debug
  maze[1].length = 110;
  crrLength=nextLength;

  nextLength =100;
  maze[2] = createMazeWall(wall_color, nextLength,true);
  //left to right: crr, next, crrAlongZ, nextLength, attach on the positive axis side, crrLength, attach position.
  //setPosition(maze[0],maze[1],true,nextLength,true,crrLength,3);
  maze[2].position.set(maze[1].position.x+maze[1].length/2+20,maze[1].position.y,-70);
  crrLength=nextLength;

  nextLength =110;
  maze[3] = createMazeWall(wall_color, nextLength);
  //left to right: crr, next, crrAlongZ, nextLength, attach on the positive axis side, crrLength, attach position.
  //setPosition(maze[0],maze[1],true,nextLength,true,crrLength,3);
  maze[3].position.set(maze[0].position.x+nextLength/2+2.5, maze[1].position.y, -35);//for debug
  crrLength=nextLength;

  nextLength =45
  maze[4] = createMazeWall(wall_color, nextLength,true);
  //left to right: crr, next, crrAlongZ, nextLength, attach on the positive axis side, crrLength, attach position.
  //setPosition(maze[0],maze[1],true,nextLength,true,crrLength,3);
  maze[4].position.set(maze[0].position.x+20+2.5,maze[0].position.y,(maze[3].position.z-nextLength/2)+2.5);//for debug
  crrLength=nextLength;

  nextLength =115;
  maze[5] = createMazeWall(wall_color, nextLength);
  maze[5].position.set(maze[1].position.x-10+7.5,maze[0].position.y,(maze[4].position.z+crrLength/2)-2.5);//for debug
  crrLength=nextLength;
  maze[5].visible = false;

  nextLength =115;
  maze[6] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[6].position.set(maze[2].position.x+nextLength/2+2.5,maze[3].position.y,(maze[2].position.z+crrLength/2)-10);//for debug
  crrLength=nextLength;

  nextLength =115;
  maze[7] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[7].position.set(maze[2].position.x+nextLength/2+25,maze[3].position.y,(maze[2].position.z+crrLength/2)-40);//for debug
  crrLength=nextLength;

  nextLength =115;
  maze[8] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[8].position.set(maze[2].position.x+nextLength/2+2.5,maze[3].position.y,(maze[2].position.z+crrLength/2)-70);//for debug
  crrLength=nextLength;

  nextLength =115;
  maze[9] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[9].position.set(maze[2].position.x+nextLength/2+25,maze[3].position.y,(maze[2].position.z+crrLength/2)-100);//for debug
  crrLength=nextLength;


  nextLength =240;
  maze[10] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[10].position.set(nextLength/2+2.5,maze[3].position.y,(maze[2].position.z+crrLength/2)-130);//for debug
  crrLength=nextLength;


  nextLength =220;
  maze[11] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[11].position.set(nextLength/2+20,maze[3].position.y,(maze[2].position.z+crrLength/2)-240);//for debug
  crrLength=nextLength;


  nextLength =240;
  maze[12] = createMazeWall(wall_color, nextLength,true);//at the end of maze[2]
  maze[12].position.set(maze[11].position.x+crrLength/2-2.5,maze[3].position.y,maze[11].position.z-nextLength/2-2.5);//for debug
  crrLength=nextLength;


  nextLength =240;
  maze[13] = createMazeWall(wall_color, nextLength);//at the end of maze[2]
  maze[13].position.set(maze[12].position.x-nextLength/2+2.5,maze[3].position.y,maze[12].position.z-nextLength/2-2.5);//for debug
  crrLength=nextLength;

  var index = 0;
  while(maze[index]!=null){
    //maze[index].add(maze[index+1]);
    scene.add(maze[index]);
    index++;
  }
}

// function crrAlongZ(index){
// 	if(index%2==0){
// 		return true;
// 	}
// 	return false;
// }
function setPosition(crr,next,crrAlongZ,nextL,poSide,crrL,attP){
  if(crrAlongZ){
    if(poSide){
      next.position.x=crr.position.x+nextL/2+2.5;
    }else{
      next.position.x=crr.position.x-nextL/2-2.5;
    }
    next.position.z= crr.position.z+crrL/2-attP*5-2.5;
  }else{
    if(poSide){
      next.position.z=crr.position.z+nextL/2+2.5;
    }else{
      next.position.z=crr.position.z-nextL/2-2.5;
    }
    next.position.x= crr.position.x+crrL/2-attP*5-2.5;
  }
  next.position.y = crr.position.y;
  //return;
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
