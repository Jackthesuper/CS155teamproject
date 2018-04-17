function initNPC(){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'models/' );
    mtlLoader.setPath( 'models/' );
    var url = "angrybird.mtl";
    mtlLoader.load( url, function( materials ) {

        materials.preload();
        // materials.materials["Material.006"].transparent = false
        // materials.materials["Material.006"].opacity = 1
        console.log(materials)
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/' );
        objLoader.load( 'angrybird.obj', function ( object ){
          console.log(object)
            base = 10;
            for(i = 0; i<object.children.length; i++){
              if(i == base){
                object.children[i].renderOrder = 0.5;
              }
            }
            pmaterial = new THREE.MeshBasicMaterial({})
            pmaterial.visible = false;
            mesh = new Physijs.SphereMesh(new THREE.SphereGeometry(3,32,32), pmaterial ,0, 5);
            mesh.add(object)
            mesh.position.y = 0;
            mesh.position.x = 0;
            mesh.position.z = -150;
            scene.add( mesh );

        }),
      function(xhr){
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      function(err){
        console.log("error in loading: "+err)
      }
    });

}
