
function coinRoom(){

      //Big Circle
      initCoinOBJ(40,5,-240);
      initCoinOBJ(200,5,-240);

      for(i=1;i<=16;i++){
        initCoinOBJ(40,5,-240-10*i);
        initCoinOBJ(200,5,-240-10*i);
      }

      for(j=1;j<16;j++){
        initCoinOBJ(40+10*j,5,-240);
        initCoinOBJ(40+10*j,5,-400);
      }

      //small circle
      initCoinOBJ(80,5,-280);
      initCoinOBJ(160,5,-280);

      for(m=1;m<=8;m++){
        initCoinOBJ(80,5,-280-10*m);
        initCoinOBJ(160,5,-280-10*m);
      }

      for(n=1;n<8;n++){
        initCoinOBJ(80+10*n,5,-280);
        initCoinOBJ(80+10*n,5,-360);
      }

      roomStick = createStick(0X0000ff);

      scene.add(roomStick);

      roomStick.addEventListener('collision',
        function (other_object){
          if(other_object == avatar){
            gameState.health--;
          }
        }
    )

      //roomStick.setAngularVelocity(new THREE.Vector3(0,10,0));

}

  function createStick(color){
    var geometry = new THREE.CylinderGeometry(2,2,120);
    var material = new THREE.MeshLambertMaterial({color:color});
    var mesh = new Physijs.CylinderMesh(geometry, material);
    mesh.rotateZ(Math.PI/2);
    mesh.mass = 0;
    mesh.position.set(120,5,-320);
    return mesh;
  }

  function rotateStick(){
      roomStick.rotateX(Math.PI/100);
      roomStick.__dirtyRotation = true;
      //roomStick.position.set(120,5,-320);
      //roomStick.__dirtyPosition = true;

  }
