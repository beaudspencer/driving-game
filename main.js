class Car {
  constructor($img, speed, direction, location){
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
  }
  turn(direction){
    this.$img.classList.remove(this.direction)
    this.direction = direction
    this.$img.classList.add(direction)
  }
}

var $carImg = document.createElement('img')
$carImg.setAttribute('src', 'car-black.png')
$carImg.setAttribute('style', 'width: 4rem;')
document.body.appendChild($carImg)

var car = new Car($carImg, 10, 'north', [0, 0])

window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowDown') {
    car.turn('south')
  }
  if (event.key === 'ArrowUp') {
    car.turn('north')
  }
  if (event.key === 'ArrowRight') {
    car.turn('east')
  }
  if (event.key === 'ArrowLeft') {
    car.turn('west')
  }
})
