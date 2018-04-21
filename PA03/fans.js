function initFans(x,y,z,mtl,obj,number){
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
            mesh.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
              if(other_object == avatar){
                soundEffect('laser.wav');
                gameState.health -= 2;
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
  branch.translateZ(2)
  branch.translateX(8)
  return branch
}
function addAllfans(){
  initFans(0,15,-200,"Fans.mtl", 'Fans.obj',0);
}

function rotateFans(){
  for(var i=0;i<fans.length;i++){
    fans[i].__dirtyRotation = true;
    fans[i].rotateZ(0.04)
  }
}
