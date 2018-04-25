// First we declare the variables that hold the objects we need
// in the animation code
var scene, renderer;  // all threejs programs need these
var camera, camera1, avatarCam, edgeCam, edgeCam1;  // we have two cameras in the main scene
var avatar;
// var npc;
// var npc2;
var coins = [];
var redballs = [];
var maze = [];
var boundary = [];
var npcarray=[];
var roomStick;

// here are some mesh objects ...
var cone;
var endScene, endCamera, endText;
var clock;
var controyouwon
     {fwd:false, bwd:false, left:false, right:false,
      speed:30, fly:false, jump1: false, jump2: false, airborne: false, reset:false, rotateFwd:false, rotateBwd:false,
      camera:camera, jumpspeed: 30, tpFrom: null}
// var npcState = {launched: false, launchedTime: 0}
var gameState =
    {score:0, health:10, scene:'youwon', camera:'none', music:"none"}
const grid_width = 5;
const ground_width = 550;
const wall_height = 100;
var nextwall;
var fans = []
var dapao = []
var towers = []
var avatarX = 10;
var avatarY = 3;
var avatarZ = -10;
