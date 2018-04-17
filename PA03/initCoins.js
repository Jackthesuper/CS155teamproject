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
function initCoinOBJ(){
  var loader = new THREE.OBJLoader();
  loader.load("models/3d-model.obj",
    function ( obj) {
      console.log("loading obj file");
            // obj.size.x=0.9;
            // obj.size.y=0.9;
            // obj.size.z=0.9;
            obj.position.y = 2;
            obj.position.z = 0;

            scene.add(obj);
            obj.castShadow = true;

            //
          },
          function(xhr){
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},

          function(err){
            console.log("error in loading: "+err);}
        )
  }
