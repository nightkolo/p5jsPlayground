const cen = function(){
  return {
    x: width / 2,
    y: height / 2,
  };
}
function findPos(angle){
  const rad = (angle + 90) * (Math.PI / 180);
  return {
    x: Math.cos(rad),
    y: Math.sin(rad),
  };
}
function findVector(x, y){
  let value = 0;

  const findQuadrant = function(x, y) {
    if (x > 0 && y > 0) {return 1; }
    else if (x < 0 && y > 0) {return 2; }
    else if (x < 0 && y < 0) {return 3; }
    else if (x > 0 && y < 0) {return 4; }
  }
  
  if (x === 0 && y == 0) {
    return NaN;
  } else if (x === 0) {
    if (y > 0) {
      value = Math.PI / 2.0;
    } else if (y < 0) {
      value = Math.PI * 1.5;
    }
  } else if (y === 0) {
    if (x > 0) {
      value = Math.PI;
    } else if (x < 0) {
      value = 0;
    }
  } else {
    switch (findQuadrant(x, y)) {
      case 1:
        value = Math.abs(Math.atan(y / x));
        break;
      case 2:
        value = Math.PI - Math.abs(Math.atan(y / x));
        break;
      case 3:
        value = Math.PI + Math.abs(Math.atan(y / x));
        break;
      case 4:
        value = (Math.PI * 2.0) - Math.abs(Math.atan(y / x));
        break;
      }
    }
    return value * (180.0 / Math.PI);
  }