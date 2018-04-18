function createMainScene(){
    // setup lighting
    // var light1 = createPointLight();
    // light1.position.set(0,200,20);
    // scene.add(light1);
    var light0 = new THREE.AmbientLight( 0xffffff, 1);
    scene.add(light0);

    var light1 = createPointLight();
    light1.position.set(0,100,-275);
    scene.add(light1);

    var light2 = createDirectionalLight();
    light2.position.set(0,20,-30)
    // create main camera
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0,80,0);
    camera.lookAt(0,0,0);

    camera1 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera1.position.set(50,60,-100);
    camera1.lookAt(0,0,-100);


    // create the ground and the skybox
    var ground = createGround('planeTexture.jpg');
    scene.add(ground);
    var skybox = createSkyBox('planeTexture.jpg',1);
    scene.add(skybox);

    // create the avatar
    avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //avatar = createAvatar();
    createAvatar();

    gameState.camera = avatarCam;

    edgeCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    edgeCam.position.set(50,50,-50);

    edgeCam1 = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    edgeCam1.position.set(10,50,10);

    createMaze();

    var wall = createWall(0xffaa00,50,3,1);
    wall.position.set(10,0,10);
    //scene.add(wall);

    initCoinOBJ();
}

function createEndScene(){
  endScene = initScene();
  endText = createSkyBox('youwon.png',10);
  //endText.rotateX(Math.PI);
  endScene.add(endText);
  var light1 = createPointLight();
  light1.position.set(0,200,0);
  endScene.add(light1);

  endCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  endCamera.position.set(0,50,1);
  endCamera.lookAt(0,0,0);

}
function createStartScene(){
  startScene = initScene();
  startText = createSkyBox('start.png',5);
  startScene.add(startText);
  var light = createPointLight();
  light.position.set(0,200,20);
  startScene.add(light);
  //gameState.scene='start';
  startCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  startCamera.position.set(0,50,1);
  startCamera.lookAt(0,0,0);
}

function createLoseScene(){
  loseScene = initScene();
  loseText = createSkyBox('lose.png',5);
  loseScene.add(loseText);
  var light = createPointLight();
  light.position.set(0,200,20);
  loseScene.add(light);
  loseCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  loseCamera.position.set(0,50,1);
  loseCamera.lookAt(0,0,0);
}
//this method is called in main scene, too c


function initRenderer(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight-50 );
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function initScene(){
  //scene = new THREE.Scene();
  var scene = new Physijs.Scene();
  scene.setGravity(new THREE.Vector3(0, -50, 0));
  return scene;
}

function initPhysijs(){
  Physijs.scripts.worker = 'js/physijs_worker.js';
  Physijs.scripts.ammo = 'ammo.js';
}

function animate() {

  requestAnimationFrame( animate );

  switch(gameState.scene) {
    case "lose":
      loseText.rotateY(0.005);
      renderer.render( loseScene, loseCamera );
      break;
    case "start":
      startText.rotateY(0.005);
      renderer.render( startScene, startCamera );
      break;
    case "youwon":
      endText.rotateY(0.005);
      renderer.render( endScene, endCamera );
      break;

    case "main":
      updateAvatar();
      // updateNPC();
      // updateNPC2();
      updateRedBalls();
      edgeCam.lookAt(avatar.position);
      edgeCam1.lookAt(avatar.position);
      scene.simulate();
      if (gameState.camera!= 'none'){
        renderer.render( scene, gameState.camera );
      }
      break;

    default:
      console.log("don't know the scene "+gameState.scene);
  }
  //draw heads up display ..
  // console.dir(document.getElementById("info"))
  document.getElementById("info").innerHTML='<div style="font-size:24pt">Score: '
  + gameState.score
  + " health="+gameState.health
  + '</div>';
}

function playGameMusic(){
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( '/sounds/loop.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.05 );
    sound.play();
  });
}

// play backgroud music
switch(gameState.music){
  case "none":
    break;
  case "loop":
    soundEffect("loop.mp3");
    break;
  case "good":
    soundEffect("good.wav");
    break;

}

function soundEffect(file){
  // create an AudioListener and add it to the camera
  var listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  var sound = new THREE.Audio( listener );

  // load a sound and set it as the Audio object's buffer
  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'sounds/'+file, function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
    sound.play();
  });
}

/* We don't do much here, but we could do more!
*/

/*
  The renderer needs a size and the actual canvas we draw on
  needs to be added to the body of the webpage. We also specify
  that the renderer will be computing soft shadows
*/

function updateRedBalls(){
  for(i = 0; i<redballs.length; i+=1){
    var v = redballs[i].getLinearVelocity()
    var length = v.length();
    // ||length < 0.01||redballs[i].position.y > 5
    if(redballs[i].position.y < -50||redballs[i].position.y > 5){
      break;
    }
    var dif = new THREE.Vector3();
    var new_v = new THREE.Vector3();
    var cone_position = new THREE.Vector3(cone.position.x, cone.position.y-3, cone.position.z);
    dif.subVectors(cone_position, redballs[i].position)
    new_v.addVectors(v, dif.multiplyScalar(1/cone.position.distanceTo(redballs[i].position)).multiplyScalar(0.03).multiplyScalar(v.length()))
    redballs[i].__dirtyPosition = true;
    redballs[i].setLinearVelocity(new_v);
  }
}


function updateAvatar(){
  // "change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"

  var forward = avatar.getWorldDirection();

  if (controls.fwd){
    // console.log(avatar.getLinearVelocity().y)
    if(Math.abs(avatar.getLinearVelocity().y)<0.25){
      avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
    }
    else{
      avatar.applyCentralForce(forward.multiplyScalar(60*controls.speed))
    }
  } else if (controls.bwd){
    if(Math.abs(avatar.getLinearVelocity().y)<0.25){
      avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
    }
    else{
      avatar.applyCentralForce(forward.multiplyScalar(-60*controls.speed))
    }
  } else {
    var velocity = avatar.getLinearVelocity();
    velocity.x=velocity.z=0;
    avatar.setLinearVelocity(velocity); //stop the xz motion
  }
  if(controls.fly){
    if(!controls.jump1){
          console.log("trying to jump1")
      avatar.setLinearVelocity(new THREE.Vector3(0,controls.speed,0));
      controls.jump1 = true;
      airborne = true;
      controls.fly = false;
    }
    else if(!controls.jump2){
          console.log("trying to jump2")
      avatar.setLinearVelocity(new THREE.Vector3(0, controls.speed,0))
      controls.jump2 = true;
      airborne = true;
      controls.fly = false;
    }
  }
  if ((controls.left&&!controls.bwd)||(controls.right&&controls.bwd)){
    avatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
  } else if ((controls.left&&controls.bwd)||(controls.right&&!controls.bwd)){
    avatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
  }
  else if(controls.rotateFwd){
    avatar.setAngularVelocity(new THREE.Vector3(controls.speed*0.1,0,0));
  }else if(controls.rotateBwd){
    avatar.setAngularVelocity(new THREE.Vector3(-controls.speed*0.1,0,0));
  }
  else{
    avatar.setAngularVelocity(new THREE.Vector3(0,0,0))
  }

  if (controls.reset){
    avatar.__dirtyPosition = true;
    avatar.position.set(40,10,40);
  }

}
