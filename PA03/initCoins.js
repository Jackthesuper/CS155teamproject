// function createCoin(w,h,d){
/*	//var geometry = new THREE.SphereGeometry( 4, 20, 20);
  var geometry = new THREE.BoxGeometry( 5, 5, 6);
  var material = new THREE.MeshLambertMaterial( { color: 0xffff00} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.8);
  //var mesh = new THREE.Mesh( geometry, material );
  var mesh = new Physijs.BoxMesh( geometry, pmaterial );
  mesh.castShadow = true;

  avatarCam.position.set(0,4,0);
  avatarCam.lookAt(0,4,10);
  mesh.add(avatarCam);

  return mesh;*/
  //var suzanne;
  function initCoinOBJ(x, y, z){
    var loader = new THREE.OBJLoader();
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'models/' );
    mtlLoader.setPath( 'models/' );
    mtlLoader.load( "3d-model.mtl", function(materials ) {

    materials.preload();
    console.log(materials)
    loader.setMaterials( materials );
    loader.setPath( 'models/' );
    loader.load("3d-model.obj",
      function ( obj) {
        console.log(obj);
              material = new THREE.MeshLambertMaterial({});
              obj.children[0].geometry.scale(0.003,0.003,0.003);
              obj.children[1].geometry.scale(0.003,0.003,0.003)
              obj.children[0].material.opacity = 1;
              obj.children[0].material.transparent = false;
              obj.children[1].material.opacity = 1;
              obj.children[1].material.transparent = false;
              //pmaterial = new THREE.MeshBasicMaterial({})

              pmaterial = new Physijs.createMaterial(material);
              pmaterial.visible = false;
              mesh = new Physijs.BoxMesh(new THREE.BoxGeometry(1,1,0.3), pmaterial, 0);
              mesh.add(obj);
              mesh.translateZ(z);
              mesh.translateX(x);
              mesh.translateY(y);
              mesh.rotateY(10);
              console.log(mesh);
              //mesh.mass=1;
              scene.add(mesh);

              var length=coins.length;
              coins[length] = mesh;

              console.log(coins)
              mesh.castShadow = true;
              mesh.addEventListener( 'collision',
      				    function( other_object, relative_velocity, relative_rotation, contact_normal ) {
  					          if (other_object==avatar){
      						       console.log("coin "+i+" hit the cone");
      						       soundEffect('good.wav');
          						   gameState.score += 1;  // add one to the score
                         //scene.remove(ball);  // this isn't working ...
      						       // make the ball drop below the scene ..
             						 // threejs doesn't let us remove it from the schene...
						             this.position.y = this.position.y - 100;
      						       this.__dirtyPosition = true;

      					      }

      				    }

      			  )

            },
            function(xhr){
              console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},

            function(err){
              console.log("error in loading: "+err);}
          );
        });
    }

  function rotateCoin(){
      for(var i=0;i<coins.length;i++){
        //coins[i].rotateY(0.05);
        for(var j=0;j<coins[i].children.length;j++){
          coins[i].children[j].rotateY(0.05);
        }
      }
  }
