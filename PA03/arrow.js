function initArrow(x,y,z){
      console.log("testtttttt")
      var loader = new THREE.OBJLoader();
      loader.load("models/arrow.obj",
      function ( obj ) {

        obj.scale.x = 2
        obj.scale.y = 2
        obj.scale.z = 2
        for(i = 0; i<obj.children.length; i++){
          obj.children[i].material.color = new THREE.Color(0x04f761)
        }
        material = new THREE.MeshBasicMaterial({})
        material.visible = false;
        arrow = new Physijs.BoxMesh(new THREE.BoxGeometry(1.5,3,0.5), material, 0);
        obj.translateY(-1.5)
        arrow.add(obj);
        console.log(arrow)
        arrow.translateY(17)
        arrow.position.x = x
        arrow.position.y = y
        arrow.position.z = z
        arrow.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
          // console.log(contact_normal.y<-0.5)
            if(other_object == avatar){
              //tpFrom = avatar.
              avatar.position.set(-45, 180, -260)
              avatar.__dirtyPosition = true;
              avatarX = x+15;
              avatarY = 5;
              avatarZ = z;
            }
        });
        arrow.rotateZ(Math.PI)
        arrows.push(arrow)
        scene.add(arrow)
      });
}

function updateArrows(){
  for(let i = 0; i<arrows.length; i++){
    arrows[i].rotateY(0.03);
    arrows[i].__dirtyRotation = true;
  }
}
