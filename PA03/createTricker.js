function createTricker(){
  var geometry = new THREE.BoxGeometry(10,10,10);
  var material= new THREE.MeshLambertMaterial( { color: 0xff0000});
  var mesh = new Physijs.BoxMesh( geometry, material);
  mesh.position.set(270,5,-200);
  mesh.addEventListener('collision',
      funtion(other_object){
        if(other_object ==avatar&& gameState.score>20&&tricker==false){
            for(var l=0;l<3;l++){
              soundEffect('good1.mp3');
              fans[l].__dirtyPosition = true;
              fans[l].translateX(50);
            }
            tricker = true;
      })
}
