function toggle() {
    var x = document.getElementById("t");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    document.getElementById("game-name").style.margintop="2rem";
    grids()
    }

function grids(){
for (var i = 0; i < 3; i++) {
    var row = document.createElement('div');
    row.className = "row";
    for (var j = 0; j < 3; j++) {
        var box = document.createElement('div');
        box.className = "box";
        row.appendChild(box);
    }                
    document.getElementById('landing-page').appendChild(row);
}
}