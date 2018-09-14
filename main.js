class Car {
  constructor($img, speed, direction, location){
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
    this.vroom = null
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
    if(this.location[0] > window.innerWidth) {
      this.location[0] = 0
    }
    if(this.location[1] > window.innerHeight) {
      this.location[1] = 0
    }
    this.$img.setAttribute('style', ('left: ' + this.location[0] + 'px; top: ' + this.location[1] + 'px;'))
  }
  start(){
    this.vroom = setInterval(this.move.bind(this), 16)
  }
  stop() {
    clearInterval(this.vroom)
    this.vroom = null
  }
}

class RaceCar extends Car {
  constructor ($img, speed, direction, location, nitros) {
    super($img, speed, direction, location)
    this.nitros = nitros
  }
  nitro() {
    if(this.nitros > 0) {
      this.speed *= 2
      this.nitros--
    }
  }
}

function createElement (tag, attributes, children) {
  var $element = document.createElement(tag)
  if(attributes) {
    for (var keys in attributes) {
      $element.setAttribute(keys, attributes[keys])
    }
  }
  for(var c = 0; c < children.length; c++) {
    if(children[c] instanceof Node) {
      $element.appendChild(children[c])
    }
    else {
      $element.appendChild(document.createTextNode(children[c]))
    }
  }
  return $element
}

var $selector = createElement('div', {class: 'options', style: 'text-align: center;'}, [
  createElement('button', {id: 'car', style: 'width: 6rem; background-color: lightblue;'}, ['Car']),
  createElement('button', {id: 'race', style: 'width: 6rem; background-color: orange;'}, ['Race Car'])
])
document.body.appendChild($selector)

var car = null
$carImg = createElement('img', {}, [])

window.addEventListener('click', function(event) {
  if(event.target.getAttribute('id') === 'car') {
    $carImg.setAttribute('src', 'car-black.png')
    car = new Car($carImg, 4, 'east', [0, 0])
    $selector.innerHTML = ''
  }
  else if(event.target.getAttribute('id') === 'race') {
    $carImg.setAttribute('src', 'race-cuur.png')
    car = new RaceCar($carImg, 6, 'east', [0, 0], 2)
    $selector.innerHTML = ''
  }
  document.body.appendChild($carImg)
})

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
    if(!car.vroom) {
      car.start()
    }
    else {
      car.stop()
    }
  }
  if(event.key === 'r' && car instanceof RaceCar) {
      car.nitro()
  }
})
