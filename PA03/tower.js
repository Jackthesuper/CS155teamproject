
function initTower(x, y, z, index){
  var loader = new THREE.OBJLoader();
  loader.load("models/arrow.obj",
        function ( obj ) {
          geometry = new THREE.CylinderGeometry(0.6,1,100, 32)
          mesh  = new Physijs.CylinderMesh(geometry, new THREE.MeshLambertMaterial({color: 0xefedba}), 0)
          plane = new Physijs.BoxMesh(new THREE.BoxGeometry(30, 30, 1), new THREE.MeshLambertMaterial({color: 0xefedba}), 0)
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
          arrow_down.position.set(x, 103, z)
          // mesh.add(arrow_down)
          mesh.arrow = arrow_down
          towerWall1 = new Physijs.BoxMesh(new THREE.BoxGeometry(32, 20,0.1), new THREE.MeshBasicMaterial({}), 0)
          towerWall1.translateY(60)
          towerWall1.translateZ(16)
          towerWall1.material.visible = false
          mesh.add(towerWall1)
          towerWall2 = new Physijs.BoxMesh(new THREE.BoxGeometry(32, 20,0.1), new THREE.MeshBasicMaterial({}), 0)
          towerWall2.translateY(60)
          towerWall2.translateZ(-16)
          towerWall2.material.visible = false
          mesh.add(towerWall2)
          towerWall3 = new Physijs.BoxMesh(new THREE.BoxGeometry(32, 20,0.1), new THREE.MeshBasicMaterial({}), 0)
          towerWall3.translateY(60)
          towerWall3.translateX(16)
          towerWall3.rotateY(Math.PI/2)
          towerWall3.material.visible = false
          mesh.add(towerWall3)
          towerWall4 = new Physijs.BoxMesh(new THREE.BoxGeometry(32, 20,0.1), new THREE.MeshBasicMaterial({}), 0)
          towerWall4.translateY(60)
          towerWall4.translateX(-16)
          towerWall4.rotateY(Math.PI/2)
          towerWall4.material.visible = false
          mesh.add(towerWall4)

          mesh.position.x = x
          mesh.position.y = y
          mesh.position.z = z
          towers[index] = mesh
          mesh.number = index
          arrow_down.addEventListener('collision', function(other_object){
            console.log('collide')
              if(other_object == avatar && other_object.position.y>80){
                console.log("get down")
                avatar.__dirtyPosition = true;
                avatar.position.x = avatarX
                avatar.position.y = avatarY
                avatar.position.z = avatarZ
              }
              
          })
          scene.add(arrow_down)
          scene.add(mesh)
        }
  )

}

function updateAllTowers(){
  for(i = 0; i<towers.length; i++){
    towers[i].arrow.rotateY(0.03);
    towers[i].arrow.__dirtyRotation = true;
  }
}

function addAllTowers(){
  initTower(-45, 50, -250, 0)
}
