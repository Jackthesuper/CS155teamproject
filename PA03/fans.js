function initFans(x,y,z,mtl,obj,number, alongZ = 'true'){
    var mesh;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'models/' );
    mtlLoader.setPath( 'models/' );
    var url = mtl;
    mtlLoader.load( url, function( materials ) {

        materials.preload();
        // materials.materials["Material.006"].transparent = false
        // materials.materials["Material.006"].opacity = 1
        console.log(materials)
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/' );
        objLoader.load(obj, function ( object ){
          object.scale.x = 10;
          object.scale.y = 10;
          object.scale.z = 10;
          console.log(object)
            object.rotateX(-Math.PI/2);
            // object.translateY(-2.47)
            // object.translateX(0.5)
            material = new THREE.MeshBasicMaterial({})
            material.visible = false;
            pmaterial = new Physijs.createMaterial(material, 0.0, 1)
            // pmaterial.opacity = 0.5
            // pmaterial.transparent = true;
            mesh = new Physijs.SphereMesh(new THREE.SphereGeometry(3,32,32), pmaterial ,0);
            branch1 = addBranch(pmaterial, -Math.PI/6)
            branch2 = addBranch(pmaterial, Math.PI/2)
            branch3 = addBranch(pmaterial, -5*Math.PI/6)

            mesh.add(object)
            mesh.add(branch1)
            mesh.add(branch2)
            mesh.add(branch3)
            //mesh.mass = 10;

            mesh.position.y = y;
            mesh.position.x = x;
            mesh.position.z = z;
            if(!alongZ){
              mesh.rotateY(Math.PI/2)
            }
            mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
              if(other_object == avatar){
                soundEffect('laser.wav');
                gameState.health --;
              }
            });
            scene.add( mesh );
            mesh.setDamping(0.18,0.1)
            mesh.number = number;
            fans[number] = mesh;
        }),
      function(xhr){
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      function(err){
        console.log("error in loading: "+err)
      }
    });

}

function addBranch(pmaterial, rotation){
  branch = new Physijs.BoxMesh(new THREE.BoxGeometry(13, 3, 0.8), pmaterial, 0);
  branch.rotateZ(rotation)
  branch.translateZ(1)
  branch.translateX(8)
  return branch
}
function addAllfans(){
  //add a crazy fans
  initFans(260,15,-260,"Fans.mtl", 'Fans.obj',0);
  initFans(260,15,-280,"Fans.mtl", 'Fans.obj',1);
  initFans(260,15,-300,"Fans.mtl", 'Fans.obj',2);
  //initFans(260,15,-320,"Fans.mtl", 'Fans.obj',3);
  //initFans(260,15,-340,"Fans.mtl", 'Fans.obj',4);


  //normal fans
  initFans(20,15,-200,"Fans.mtl", 'Fans.obj',3);
  initFans(64, 15, -17, "Fans.mtl", "Fans.obj", 4,false)
  initFans(93, 15, -12, "Fans.mtl", "Fans.obj", 5, false)
  initFans(107, 15, -18, "Fans.mtl", "Fans.obj", 6, false)
  initFans(180, 15, -97, "Fans.mtl", "Fans.obj", 7, false)
}

function rotateFans(){
  for(var l=0;l<3;l++){
    fans[l].__dirtyRotation = true;
    fans[l].rotateZ(0.5);
  }
  for(var i=3;i<fans.length;i++){
    fans[i].__dirtyRotation = true;
    fans[i].rotateZ(0.04)
  }
}
