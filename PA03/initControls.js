function initControls(){
  // here is where we create the eventListeners to respond to operations

    //create a clock for the time-based animation ...
    clock = new THREE.Clock();
    clock.start();

    window.addEventListener( 'keydown', keydown);
    window.addEventListener( 'keyup',   keyup );
    window.addEventListener( 'keypress', keypress);
}

function keypress(event){
  switch (event.key){
    case " ": controls.fly = true;
        console.log("space!!");
        break;
  }
}

function keydown(event){
  if ((gameState.scene == 'youwon'||gameState.scene == 'lose')&& event.key=='r') {
    console.log("init");
    reset();
    gameState.scene = 'start';
    gameState.score = 0;
    gameState.health = 10;
    avatar.position.set(avatarX,avatarY,avatarZ);
    avatar.__dirtyPosition = true;
    addBalls();
    return;
  }
  if(gameState.scene == 'start' && event.key=='p'){
    gameState.scene = 'main';
    gameState.score = 0;
    gameState.health = 10;
    tricker = false;
  }

  // this is the regular scene
  switch (event.key){
    case "b": addBalls1(); break;
    // change the way the avatar is moving

    case "w": controls.fwd = true;  break;
    case "s": controls.bwd = true; break;
    case "a": controls.left = true; break;
    case "d": controls.right = true; break;
    case "r": controls.up = true; break;
    case "f": controls.down = true; break;
    case "m": controls.speed = 60; break;
    case ",": controls.speed = 120; break;
    case "h": controls.reset = true; break;
    case "u": controls.rotateFwd = true; break;
    case "j": controls.rotateBwd = true; break;

    // switch cameras
    case "1": gameState.camera = camera; break;
    case "2": gameState.camera = avatarCam; break;
    case "3": gameState.camera = edgeCam; break;
    case "4": gameState.camera = camera1; break;
    case "5": gameState.camera = edgeCam1; break;

    // move the camera around, relative to the avatar
    //case "ArrowLeft": avatarCam.translateY(1);break;
    //case "ArrowRight": avatarCam.translateY(-1);break;
    //case "ArrowUp": avatarCam.translateZ(-1);break;
    //case "ArrowDown": avatarCam.translateZ(1);break;

    case "ArrowLeft": gameState.camera.translateX(-2);break;
    case "ArrowRight": gameState.camera.translateX(2);break;

    case "ArrowUp":
      if(gameState.camera == avatarCam) {
        avatarCam.translateZ(-2); break;
      }
      else{
          gameState.camera.translateY(2);break;
      }
    case "ArrowDown":
      if(gameState.camera == avatarCam) {
        avatarCam.translateZ(2); break;
      }
      else{
          gameState.camera.translateY(-2);break;
      }

    case "q": avatarCam.rotateY(0.25);break;
    case "e": avatarCam.rotateY(-0.25);break;

    // add music key
    case "6": gameState.music = "loop"; break;
    case "7": gameState.music = "good"; break;

  }

}

function keyup(event){
  // console.log("Keyup:"+event.key);
  // console.dir(event);
  switch (event.key){
    case "w": controls.fwd   = false;  break;
    case "s": controls.bwd   = false; break;
    case "a": controls.left  = false; break;
    case "d": controls.right = false; break;
    case "r": controls.up    = false; break;
    case "f": controls.down  = false; break;
    case "m": controls.speed = 30; break;
    case ",": controls.speed= 30; break;
    case " ":
      soundEffect('bounce.wav');
      controls.fly = false;
      break;
    case "h": controls.reset = false; break;
    case "u": controls.rotateFwd = false; break;
    case "j": controls.rotateBwd = false; break;
    case "k": reset();

    // add music key
    case "6": gameState.music = "none"; break;
    case "7": gameState.music = "none"; break;

  }
}
