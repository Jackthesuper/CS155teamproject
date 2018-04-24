
/*
Game 0
This is a ThreeJS program which implements a simple game
The user moves a cube around the board trying to knock balls into a cone

*/
	// Here is the main game control
  init(); //
	initControls();
	animate();  // start the animation loop!
	/**
	  To initialize the scene, we initialize each of its components
	*/
	function init(){
      initPhysijs();
			scene = initScene();
			createEndScene();
			initRenderer();
			createMainScene();      
			createLoseScene();
			createStartScene();
	}
