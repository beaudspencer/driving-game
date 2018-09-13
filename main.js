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
  move() {
    switch (this.direction){
        case 'north' :
          if(this.location[1] >= 0)
            this.location[1] -= this.speed
          break
        case 'south' :
          this.location[1] += this.speed
          break
      case 'east' :
        this.location[0] += this.speed
        break
      case 'west' :
        if (this.location[0] >= 0)
          this.location[0] -= this.speed
    }
    this.$img.setAttribute('style', ('left: ' + this.location[0] + 'px; top: ' + this.location[1] + 'px;'))
  }
  start(){
    var vroom = setInterval(this.move.bind(this), 16)
  }
}

var $carImg = document.createElement('img')
$carImg.setAttribute('src', 'car-black.png')
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
  if(event.key === ' ') {
    car.start()
  }
})
