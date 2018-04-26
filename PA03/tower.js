
function initTower(x, y, z, index){
  var loader = new THREE.OBJLoader();
  loader.load("models/arrow.obj",
        function ( obj ) {
          geometry = new THREE.CylinderGeometry(0.6,1,100, 32)
          mesh  = new Physijs.CylinderMesh(geometry, new THREE.MeshLambertMaterial({color: 0xefedba}), 0)
          plane = new Physijs.BoxMesh(new THREE.BoxGeometry(16, 16, 1), new THREE.MeshLambertMaterial({color: 0xefedba}), 0)
          plane.rotateX(Math.PI/2)
          plane.translateZ(-50.5)
          mesh.add(plane)
          obj.scale.x = 2
          obj.scale.y = 2
          obj.scale.z = 2
          for(i = 0; i<obj.children.length; i++){
            obj.children[i].material.color = new THREE.Color(0x04f761)
          }
          material = new THREE.MeshBasicMaterial({})
          material.visible = false;
          // material.opacity = 0.5;
          // material.transparent = true;
          var arrow_down = new Physijs.BoxMesh(new THREE.BoxGeometry(1.5,3,0.5), material, 0);
          obj.translateY(-1.5)
          arrow_down.add(obj);
          console.log(arrow_down)
          // arrow.translateZ(5)
          arrow_down.translateY(53)
          // arrow_down.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
          // })
          mesh.position.x = x
          mesh.position.y = y
          mesh.position.z = z
          towers[index] = mesh
          mesh.number = index
          mesh.addEventListener('collision', function(other_object){
            console.log('collide')
              if(other_object == avatar && other_object.position.y>80){
                console.log("get down")
                avatar.__dirtyPosition = true;
                avatar.position.x = gameState.tpFrom.x
                avatar.position.y = gameState.tpFrom.y
                avatar.position.z = gameState.tpFrom.z
              }
          })
          scene.add(mesh)
        }
  )

}

function updateAllTowers(){
  for(i = 0; i<towers.length; i++){
    towers[i].children[1].rotateY(0.03);
    towers[i].children[1].__dirtyRotation = true;
  }
}

function addAllTowers(){
  initTower(-45, 50, -250, 0)
}
