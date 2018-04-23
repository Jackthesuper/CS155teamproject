function coinsInRightBigRoom(){

      //big circle
      initCoinOBJ(20,5,-220);
      initCoinOBJ(220,5,-220);
      //initCoinOBJ(20,5,-200-10);
      for(i=1;i<=20;i++){
        initCoinOBJ(20,5,-220-10*i);
        initCoinOBJ(220,5,-220-10*i);
      }

      for(j=1;j<20;j++){
        initCoinOBJ(20+10*j,5,-220);
        initCoinOBJ(20+10*j,5,-420);
      }

      //small circle
      initCoinOBJ(60,5,-260);
      initCoinOBJ(150,5,-260);

      for(k=1;k<=10;i++){
        initCoinOBJ(60,5,-260-10*k);
        initCoinOBJ(150,5,-260-10*k);
      }


}
