function initMouth(x,y,z,mtl,obj,position){
    var points = []
    for ( var i = 0; i < 10; i ++ ) {
    	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 4 ) );
    }
    var geometry = new THREE.LatheGeometry( points );
    geometry.rotateZ(-Math.PI/2)
    geometry.rotateY(-Math.PI/2)
    object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xa4ada2}))
    object.material.side = THREE.DoubleSide
    console.log(object)
    bullet = createbullet(physics=false)
    object.add(bullet)
    // bullet.translateY()
    // bullet.translateZ(-10)
    object.scale.x = 0.5
    object.scale.y = 0.5
    object.scale.z = 0.5
    // // pmaterial.opacity = 0.5
    // // pmaterial.transparent = true;
    object.position.y = y;
    object.position.x = x;
    object.position.z = z;
    mouth[position] = object
    // mesh.rotateZ(-Math.PI/2)
    object.launched = false;
    object.launchedTime = 0;
    scene.add(object)
}
function createbullet(physics=true){
  geometry = new THREE.SphereGeometry(2, 16, 16)
  mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0x434743}))
  if(!physics){
    return mesh
  }
  pmaterial = new Physijs.createMaterial(mesh.material, 0.5, 1.6)
  pmesh = new Physijs.SphereMesh(geometry, pmaterial, 0.5)
  pmesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
      if(other_object == avatar){
        gameState.health--;
      }
    }
  )
  return pmesh;
}

function updateMouth(){
  for(let i = 0; i < mouth.length; i++){
    time = new Date().getTime()
    direction = new THREE.Vector3(avatar.position.x, avatar.position.y+3, avatar.position.z)
    mouth[i].__dirtyPosition = true;
    mouth[i].__dirtyRotation = true;
    mouth[i].lookAt(direction)
    if(time-mouth[i].launchedTime > 1000 && mouth[i].launched){
      mouth[i].launched = false;
    }
    if(avatar.position.distanceTo(mouth[i].position)<75 && !mouth[i].launched){
      mouth[i].launched = true;
      mouth[i].launchedTime = time;
      console.log("launching")
      bullet = createbullet(physics=true)
      bullet.__dirtyPosition = true;
      bullet.position.set(mouth[i].position.x, mouth[i].position.y, mouth[i].position.z)
      // console.log(mouth[i].getWorldDirection().multiplyScalar(20).add(new THREE.Vector3(0,5,0)))
      scene.add(bullet)
      // bullet.translateZ(-4)
      // distance = new THREE.Vector3(0,0,0);
      // distance.subVectors(avatar.position, mouth[i].position)
      bullet.setLinearVelocity(mouth[i].getWorldDirection().multiplyScalar(100).add(new THREE.Vector3(0,8,0)))
      // console.log(bullet)


    }
  }
}


function addAllMouths(){
  initMouth(38, 8, -65, 'ShotGlass.mtl', 'ShotGlass.obj', 0)
}
