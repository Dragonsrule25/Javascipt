var makeGrid = function(l, w){
    var odd = " #".repeat(w);
    var even = "# ".repeat(w);
    for(i = 1; i <= l; i++){
      if (i % 2 == 0 || i == 2){
        console.log(even);
          
      }
      else{
        console.log(odd);
      }
    }
  }
