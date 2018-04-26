function createTricker(){
  var geometry = new THREE.BoxGeometry(10,10,10);
  var material= new THREE.MeshLambertMaterial( { color: 0xff00ff});
  var mesh = new Physijs.BoxMesh( geometry, material,0);
  mesh.position.set(270,5,-200);
  mesh.addEventListener('collision',
      function (other_object){
        if(other_object ==avatar && gameState.score>10 &&tricker==false){
                  for(var o=0;o<3;o++){
                    soundEffect('good1.mp3');
                    fans[o].__dirtyPosition = true;
                    fans[o].position.set(260,40,-180-40*o);
                    //fans[o].translateX(30);
                  }
                  mesh.__dirtyPosition=true;
                  mesh.translateY(-100);
                  tricker = true;
        }
      })
  scene.add(mesh);
}
