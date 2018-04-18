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
function initCoinOBJ(index, x, y, z){
  var loader = new THREE.OBJLoader();
  loader.load("models/3d-model.obj",
    function ( obj) {
      console.log("loading obj file");
            material = new THREE.MeshLambertMaterial({color:0xffff00});
            obj.children[0].geometry.scale(0.003,0.003,0.003);
            obj.children[1].geometry.scale(0.003,0.003,0.003)
            pmaterial = new THREE.MeshBasicMaterial({})
            pmaterial.visible = false;
            mesh = new Physijs.BoxMesh(new THREE.BoxGeometry(1,1,0.3), pmaterial, 1);
            mesh.add(obj);
            mesh.translateZ(-10);
            mesh.translateX(10);
            mesh.translateY(20);
            mesh.rotateY(10);
            //mesh.mass=1;
            scene.add(mesh);
            console.log(coins)
            coins[0] = mesh;
            console.log(coins)
            obj.castShadow = true;

          },
          function(xhr){
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},

          function(err){
            console.log("error in loading: "+err);}
        )
  }

function rotateCoin(){
    for(var i=0;i<coins.length;i++){
      coins[i].rotateY(0.05);
      coins[i].children[i].rotateY(0.05);
    }


}
