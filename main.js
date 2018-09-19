class Car {
  constructor($img, speed, direction, location, $container){
    this.$container = $container
    this.$img = $img
    this.speed = speed
    this.direction = direction
    this.location = location
    this.vroom = null
    this.$container.appendChild(this.$img)
  }
  turn(){
    this.$img.style.transform = ('rotate(' + this.direction + 'deg)')
  }
  move() {
    const radian = this.direction *  (Math.PI / 180)
    this.location[0] += (Math.sin(radian) * this.speed)
    this.location[1] += -(Math.cos(radian) * this.speed)
    this.$container.style.transform = 'translate(' + this.location[0] + 'px, ' +  this.location[1] + 'px)'
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
  constructor ($img, speed, direction, location, $container, nitros) {
    super($img, speed, direction, location, $container)
    this.nitros = nitros
  }
  nitro() {
    if(this.nitros > 0) {
      this.speed *= 2
      this.nitros--
      setTimeout(() => this.speed = this.speed/2, 2000)
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
  createElement('button', {id: 'start', style: 'width: 6rem; background-color: orange;'}, ['Start!'])
])
document.body.appendChild($selector)

var car = null
$carImg = createElement('img', {}, [])

$selector.addEventListener('click', function(event) {
  const $car = document.querySelector('.car')
  if(event.target.getAttribute('id') === 'start') {
    $carImg.setAttribute('src', 'race-cuur.png')
    car = new RaceCar($carImg, 4, 85, [0, 0], $car, 2)
    $selector.innerHTML = ''
  }
  document.body.appendChild($car)
})

window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    car.direction += 5
    car.turn()
  }
  if (event.key === 'ArrowLeft') {
    car.direction -= 5
    car.turn()
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
