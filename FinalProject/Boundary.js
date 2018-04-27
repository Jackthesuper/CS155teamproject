function Boundary(){
  var boundary_color = 0x0000ff;
  boundary[0]= createBoundary(boundary_color,ground_width,alongZ=true);
  boundary[0].position.set(-ground_width/2+2.5,0,(-ground_width/2)+5);
  scene.add(boundary[0]);
  boundary[1]= createBoundary(boundary_color,ground_width-10,false);
  boundary[1].position.set(0,0,2.5);
  scene.add(boundary[1]);
  boundary[2]= createBoundary(boundary_color,ground_width,true);
  boundary[2].position.set(ground_width/2+2.5,0,(-ground_width/2)+5);
  scene.add(boundary[2]);
  boundary[3]= createBoundary(boundary_color,ground_width,false);
  boundary[3].position.set(0,0,-ground_width+2.5);
  scene.add(boundary[3]);
}

function createBoundary(color,length,alongZ = false){
  var geometry;
  if(alongZ){
  geometry = new THREE.BoxGeometry(grid_width, 150, length)
  }
  else{
  geometry = new THREE.BoxGeometry(length, 150, grid_width)
  }
  var texture = new THREE.TextureLoader().load( '../images/'+'B04.png' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  var material = new THREE.MeshLambertMaterial( { color: color,  map: texture ,side:THREE.DoubleSide} );
  material.visible = false;
  var pmaterial = new Physijs.createMaterial(material,0.9,0.5)
  mesh = new Physijs.BoxMesh(geometry, pmaterial, 0)
  //mesh.position.set(x, y, z)
  mesh.castShadow = true;
  return mesh;
}
