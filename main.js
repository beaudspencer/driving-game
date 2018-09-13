class Car {
  constructor($img, speed, direction, location){
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
  }
}

var $carImg = document.createElement('img')
$carImg.setAttribute('src', 'car-black.png')
document.body.appendChild($carImg)
