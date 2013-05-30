var s = new Screen($("#game")[0]);
var context = s.getContext("2d");

// Disbale smoothing, setup frame delay
context.imageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// Enable some modifiers to test
s.modOn("shake");
s.modOn("rotscale");
setTimeout(function() { s.modOff("shake"); }, 2000);

function tick() {
    s.modTick();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, 200, 200);
    requestAnimFrame(tick);
}
tick();
