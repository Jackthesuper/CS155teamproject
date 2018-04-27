
function coinRoom(){

      //Big Circle
      initCoinOBJ(40,3,-240);
      initCoinOBJ(200,3,-240);

      for(i=1;i<=16;i++){
        initCoinOBJ(40,3,-240-10*i);
        initCoinOBJ(200,3,-240-10*i);
      }

      for(j=1;j<16;j++){
        initCoinOBJ(40+10*j,3,-240);
        initCoinOBJ(40+10*j,3,-400);
      }

      //small circle
      initCoinOBJ(80,3,-280);
      initCoinOBJ(160,3,-280);

      for(m=1;m<=8;m++){
        initCoinOBJ(80,3,-280-10*m);
        initCoinOBJ(160,3,-280-10*m);
      }

      for(n=1;n<8;n++){
        initCoinOBJ(80+10*n,3,-280);
        initCoinOBJ(80+10*n,3,-360);
      }

      roomStick = createStick(0X0000ff);

      scene.add(roomStick);

      roomStick.addEventListener('collision',
        function (other_object){
          if(other_object == avatar){
            soundEffect('laser.wav');
            gameState.health--;
          }
        }
    )

      //roomStick.setAngularVelocity(new THREE.Vector3(0,10,0));

}
  function extraCoins(){
    initCoinOBJ(177, 3, -100);
    initCoinOBJ(13,3,-49);
    initCoinOBJ(20,5,-120);
    initCoinOBJ(-20,5,-120);
    initCoinOBJ(37,3,-49);
    initCoinOBJ(259,3,-9);
    initCoinOBJ(122, 3, -34);
    initCoinOBJ(257,3,-69);
    initCoinOBJ(251,3,-130);
    initCoinOBJ(270,13,-197);
    initCoinOBJ(27,3,-172);
    initCoinOBJ(-35,104,-260);
    initCoinOBJ(-35,104,-240);
    initCoinOBJ(-55,104,-240);
    initCoinOBJ(-55,104,-260);
  }

  function createStick(color){
    var geometry = new THREE.CylinderGeometry(2,2,210);
    var material = new THREE.MeshLambertMaterial({color:color});
    var mesh = new Physijs.CylinderMesh(geometry, material);
    mesh.rotateZ(Math.PI/2);
    mesh.mass = 0;
    mesh.position.set(120,5,-320);
    return mesh;
  }

  function rotateStick(){
      roomStick.rotateX(Math.PI/300);
      roomStick.__dirtyRotation = true;

  }

  function deleteStick(){
    scene.remove(roomStick);
  }
