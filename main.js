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
$carImg.setAttribute('style', 'width: 4rem;')
document.body.appendChild($carImg)

var car = new Car($carImg, 10, 'north', [0, 0])
