function createSpotLight(){
  var light;
  light = new THREE.SpotLight( 0xffffff);
  light.castShadow = true;
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 500      // default
  return light;
}

function createPointLight(){
  var light;
  light = new THREE.PointLight( 0xffffff, 1);
  light.castShadow = true;
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 500      // default
  return light;
}

function createDirectionalLight(){
  var light;
  light = new THREE.DirectionalLight( 0xffffff, 1);
  light.castShadow = true;
  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 500      // default
  return light;
}



function createBoxMesh(color){
  var geometry = new THREE.BoxGeometry( 1, 1, 1);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  mesh = new Physijs.BoxMesh( geometry, material );
  //mesh = new Physijs.BoxMesh( geometry, material,0 );
  mesh.castShadow = true;
  return mesh;
}


function createWall(color,w,h,d){
  var geometry = new THREE.BoxGeometry( w, h, d);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  mesh = new Physijs.BoxMesh( geometry, material, 0 );
  mesh.castShadow = true;
  return mesh;
}


function createGround(image){
  // creating a textured plane which receives shadows
  var geometry = new THREE.PlaneGeometry( ground_width, ground_width, 128 );
  var texture = new THREE.TextureLoader().load( '../images/'+image );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 32, 32 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.6);
  //var mesh = new THREE.Mesh( geometry, material );
  var mesh = new Physijs.BoxMesh( geometry, pmaterial, 0 );

  mesh.receiveShadow = true;

  mesh.rotateX(Math.PI/2);
  mesh.position.z -= ground_width/2-5
  return mesh
  // we need to rotate the mesh 90 degrees to make it horizontal not vertical
}



function createSkyBox(image,k){
  // creating a textured plane which receives shadows
  var geometry = new THREE.BoxGeometry( ground_width, ground_width*2, ground_width );
  // var geometry = new THREE.SphereGeometry( ground_width, 32, 32 );
  var texture = new THREE.TextureLoader().load( '../images/'+image );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 2 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
  //var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
  //var mesh = new THREE.Mesh( geometry, material );
  var mesh = new Physijs.Mesh( geometry, material, 0 );
  mesh.position.z -= ground_width/2-5
  //mesh.receiveShadow = false;


  return mesh
  // we need to rotate the mesh 90 degrees to make it horizontal not vertical


}

function createAvatar(){
  var loader = new THREE.JSONLoader();
  var loader1 = new THREE.OBJLoader();
  loader.load("models/suzanne.json",
        function ( geometry, materials ) {
          console.log("loading suzanne");
          geometry.scale(2,2,2);
          var material = //materials[ 0 ];
          new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
          var pmaterial=new Physijs.createMaterial(material,0.9,0.0001);
          avatar = new Physijs.BoxMesh( geometry, pmaterial );
          console.log("created suzanne mesh");
          console.dir(geometry)
          console.log(JSON.stringify(avatar.scale));// = new THREE.Vector3(4.0,1.0,1.0);
          //scene.add(suzanne);
          avatar.position.z = -10;
          avatar.position.y = 3;
          avatar.position.x = 0;
          avatar.castShadow = true;
          avatar.translateY(20);
          avatarCam.translateY(4);
          avatarCam.translateZ(3);
          // avatarCam.position.set(0,2,0);
          avatarCam.lookAt(0,4,10);
          avatar.add(avatarCam);
          //avatar.rotateY=Math.PI/2;
          avatar.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal){
            // console.log(contact_normal.y<-0.5)
              if(contact_normal.y<-0.5){
                  console.log("landed")
                  controls.jump1 = false;
                  controls.jump2 = false;
                  airborne = false;
              }
          });
          scene.add(avatar);
          avatar.setDamping(0.01, 0.01);
          avatar.mass = 10000;
          console.dir(avatar)
          return avatar;
        },
        function(xhr){
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
        function(err){console.log("error in loading: "+err);}
  )


}



function createConeMesh(r,h){
  var geometry = new THREE.ConeGeometry( r, h, 32);
  var texture = new THREE.TextureLoader().load( '../images/tile.jpg' );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
  var mesh = new Physijs.ConeMesh( geometry, pmaterial, 0 );
  mesh.castShadow = true;
  return mesh;
}


function createBall(color=0xffff00, restitution=0.4){
  //var geometry = new THREE.SphereGeometry( 4, 20, 20);
  var geometry = new THREE.SphereGeometry( 1, 16, 16);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  var pmaterial = new Physijs.createMaterial(material,0.9,restitution);
  var mesh = new Physijs.BoxMesh( geometry, pmaterial );
  mesh.castShadow = true;
  return mesh;
}


function createGreenBall(color=0x00ff00, restitution=0.4){
  //var geometry = new THREE.SphereGeometry( 4, 20, 20);
  var geometry = new THREE.SphereGeometry( 1, 16, 16);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  var pmaterial = new Physijs.createMaterial(material,0.9,restitution);
  var mesh = new Physijs.BoxMesh( geometry, pmaterial );
  mesh.castShadow = true;
  return mesh;
}

function addBalls(){
  var numBalls = 20;
  for(i=0;i<numBalls;i++){
    var ball;
    if(i%4 != 0){
      ball = createBall();
      ball.position.set(randN(20)+15,30,randN(20)+15);
      scene.add(ball);
    }
    else{
      ball = createBall(color=0xfc1b1b, restitution=4)
      ball.position.set(randN(20)+15,30,randN(20)+15);
      redballs.push(ball)
      scene.add(ball);
      ball.setDamping(0.7,0.5)
    }

    ball.addEventListener( 'collision',
      function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        if (other_object==cone){
          console.log("ball "+i+" hit the cone");
          soundEffect('good.wav');
          gameState.score += 1;  // add one to the score
          if (gameState.score==numBalls) {
            gameState.scene='youwon';
          }
          //scene.remove(ball);  // this isn't working ...
          // make the ball drop below the scene ..
          // threejs doesn't let us remove it from the schene...
          this.position.y = this.position.y - 100;
          this.__dirtyPosition = true;
        }
      }
    )
  }
}
function addBalls1(){
  var numBalls = 20;
  for(i=0;i<numBalls;i++){
    var ball;
    ball = createGreenBall();
    ball.position.set(randN(20)+15,30,randN(20)+15);
    scene.add(ball);
    ball.addEventListener( 'collision',
      function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        if (other_object==avatar){
          gameState.health -= 1;
          if (gameState.health==0) {
            gameState.scene='lose';
          }

        }
      }
    )
  }
}

function reset(){
  avatar.__dirtyPosition = true;
  avatar.position.set(0,50,0);
}
function randN(n){
  return Math.random()*n;
}
