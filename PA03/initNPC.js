var npcarray;
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
        console.log(materials)
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
            pmaterial = new THREE.MeshBasicMaterial({})
            pmaterial.visible = false;
            mesh = new Physijs.SphereMesh(new THREE.SphereGeometry(5.32,32,32), pmaterial ,0, 5);
            mesh.add(object)
            //mesh.mass = 10;
            mesh.position.y = y;
            mesh.position.x = x;
            mesh.position.z = z;
            scene.add( mesh );
            npcarray[position] = mesh;
            mesh.addEventListener('collision',function(other_object){
              if (other_object==avatar){
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
    npcarray[i].update();
  }

}
function update(){
  this.lookAt(avatar.position);
  this.__dirtyPosition = true;
  if(avatar.position.distanceTo(this.position)<20){
    this.setLinearVelocity(this.getWorldDirection().multiplyScalar(5));
  }
}
