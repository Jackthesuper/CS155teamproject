
function initNPC(x,y,z,mtl,obj,position){
    var mesh;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'models/' );
    mtlLoader.setPath( 'models/' );
    var url = mtl;
    mtlLoader.load( url, function( materials ) {

        materials.preload();
        // materials.materials["Material.006"].transparent = false
        // materials.materials["Material.006"].opacity = 1
        // console.log(materials)
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/' );
        objLoader.load(obj, function ( object ){
          console.log(object)
            base = 10;
            for(i = 0; i<object.children.length; i++){
              if(i == base){
                object.children[i].renderOrder = 0.5;
              }
            }
            object.rotateY(3*Math.PI/2);
            object.translateY(-2.47)
            object.translateX(0.5)
            material = new THREE.MeshBasicMaterial({})
            material.visible = false;
            pmaterial = new Physijs.createMaterial(material, 0.0, 1)
            // pmaterial.opacity = 0.5
            // pmaterial.transparent = true;
            mesh = new Physijs.SphereMesh(new THREE.SphereGeometry(2.66,32,32), pmaterial ,10);
            mesh.add(object)
            //mesh.mass = 10;

            mesh.position.y = y;
            mesh.position.x = x;
            mesh.position.z = z;
            mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
              // console.log(contact_normal.y<-0.5)
                if(contact_normal.y>0.5 && other_object == avatar){
                  gameState.health += 2;
                    scene.remove(mesh)
                    console.log("deleted npc")
                    delete npcarray[mesh.number]
                }
            });
            scene.add( mesh );
            mesh.setDamping(0.18,0.1)
            npcarray[position] = mesh;
            mesh.number = position;
            mesh.launched = false;
            mesh.launchedTime = 0;
            mesh.addEventListener('collision',function(other_object){
              if (other_object==avatar){
                soundEffect('bounce.wav');
                gameState.health--;
              }
            })
        }),
      function(xhr){
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      function(err){
        console.log("error in loading: "+err)
      }
    });

}
function updateNPC(){
  for(i = 0; i<npcarray.length;i++){
    updateOneNPC(npcarray[i]);
  }

}
function updateOneNPC(npc){
  if(!npc){
    return;
  }
  time = new Date().getTime()
  // console.log(time-npcState.launchedTime)
  if(time-npc.launchedTime > 7500 && npc.launched){
    npc.launched = false;
    npc.setLinearVelocity(new THREE.Vector3(0,0,0))
  }
  if(avatar.position.distanceTo(npc.position)<50 && !npc.launched){
    axis = new THREE.Vector3(0,1,0)
    target = avatar.position.clone()
    // npc.children[0].lookAt(target.applyAxisAngle(axis, Math.PI/2))
    npc.lookAt(avatar.position)
    npc.__dirtyPosition = true;
    npc.__dirtyRotation = true;
    npc.setLinearVelocity(npc.getWorldDirection().multiplyScalar(20).add(new THREE.Vector3(0,40,0)));
    npc.launched = true;
    npc.launchedTime = time
  }
}
function addAllNPC(){
  initNPC(0,60,-150,"angrybird.mtl", 'angrybird.obj',0);
  initNPC(194, 30, -38, "angrybird.mtl", 'angrybird.obj', 1);
  initNPC(201, 3, -7, "angrybird.mtl", 'angrybird.obj', 2)
  initNPC(224, 3, -37, "angrybird.mtl", 'angrybird.obj', 3)
  initNPC(214, 3, -37, "angrybird.mtl", 'angrybird.obj', 4)
  initNPC(205, 3, -37, "angrybird.mtl", 'angrybird.obj', 5)
}
