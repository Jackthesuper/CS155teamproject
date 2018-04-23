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


}
