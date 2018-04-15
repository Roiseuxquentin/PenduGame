//PENDU V.1

//TODO LIST
//check array pour indice1 [le mots contient ${word.nb} charactere , le mot contient la lettre (check tableau found) ]
//check indice2 === suppression de lettre
//check indice3 === img en background du mot
//check minuteur ? declenchement d'indice et d'etapes de pendage
//fetch pour check les Json
//math.random pour la selection
//verrouiller la game apres game over ou bravo => proposer une nouvelle partie
//faire disparaitre les touches utilisèes
//

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const word = {'id': 1, 'nb': 12, 'name': 'photographie'}
const solution = word.name.split('')

let array = []
let indiceOne = document.getElementById('indice1').innerHTML = `<img class="rounded " width="80" src="indice.png" >`
let indiceToo = document.getElementById('indice2').innerHTML = `<img class="rounded " width="80" src="indice.png" >`
let indiceTree = document.getElementById('indice3').innerHTML = `<img class="rounded " width="80" src="indice.png" >`
let x = 50
let y = 280
let w = 300
let h = 20
let coulour = 'black'
let coulourBody = 'black'
let i = 0

let cases = '<span class="col-auto"></span><span class="youp col-auto border border-danger">?</span>'
document.getElementById('lettre').innerHTML = cases.repeat(word.nb)

document.getElementById('indice1').addEventListener('click', event => {
  /// ////////////////////////////////////////////////////////////////////////////PAS BEAU////////////////////////
  indiceOne = '404'
  document.getElementById('indice3').style.display = 'none'
  document.getElementById('indice1').innerHTML = `
<div class="container-fluid">
  <div class="row justify-content-center">
      <div class="col-auto indice1">${indiceTree}
    </div>
      <div class="col-auto indice1">${indiceToo}
    </div>
      <div class="col-auto">${indiceOne}
    </div>
  </div>
</div>
`
})

document.getElementById('indice2').addEventListener('click', event => {
  indiceToo = '404'
  document.getElementById('indice2').style.display = 'none'
  document.getElementById('indice2').innerHTML = `
<div class="container-fluid">
  <div class="row justify-content-center">
      <div class="col-auto indice1">${indiceTree}
    </div>
      <div class="col-auto indice1">${indiceToo}
    </div>
      <div class="col-auto">${indiceOne}
    </div>
  </div>
</div>
`
})

document.getElementById('indice3').addEventListener('click', event => {
  console.log('tree')
  indiceTree = '404'
  document.getElementById('indice3').style.display = 'none'
  document.getElementById('indice3').innerHTML = `
<div class="container-fluid">
  <div class="row justify-content-center">
      <div class="col-auto indice1">${indiceTree}
    </div>
      <div class="col-auto indice1">${indiceToo}
    </div>
      <div class="col-auto">${indiceOne}
    </div>
  </div>
</div>
`
})

//c vraiment moche >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> check moveTo()
//foret de IF ... alternative ? 
const draw = () => {
//functionner en plusieurs partie et coller a la suite du eventlistener?????????
    if (i === 0){
  drawRect()
}
  
  if (i === 1){
    w = 20
    h = -353
    x = 111
    y = 280

    drawRect({
    w = 180,
    h = 20,
    x = 111,
    y = 0,
  })
  
  if (i === 2){ 
    drawRect({
    w = 20,
    h = 80,
    x = 280,
    y = 0,
  })
  
  if (i === 3){
    drawRect({
      w: 180,
      h: 20,
      x: 111,
      y: 0,
  })

  if (i === 4){
    drawHead({
    w = 10
    h = 70
    x = 285
    y = 120
  })

  if (i ===5 )
    drawRect()
  if (i ===6 )
    drawLegLeft()
  if (i ===7 )
    drawLegRight()
  if (i ===8 )
    drawArmLeft()
  if (i ===9 ){
    drawArmRight()
      document.getElementById('lettre').innerHTML = `<span class="find col-auto border border-danger"><h1>GAME OVER</h1></span>`

  }

}

const drawRect = ({w, h, x, y}) => {
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.fillStyle = coulour
  ctx.fill()
  ctx.strokeStyle = coulourBody
  ctx.stroke()
  ctx.closePath()
}

const drawArmLeft = () => {
  ctx.beginPath()
  ctx.moveTo(285, 130)
  ctx.lineTo(260, 190)
  ctx.strokeStyle = coulourBody
  ctx.stroke()
  ctx.closePath()
}

const drawArmRight = () => {
  ctx.beginPath()
  ctx.moveTo(295, 130)
  ctx.lineTo(320, 190)
  ctx.strokeStyle = coulourBody
  ctx.stroke()
  ctx.closePath()
}

const drawLegLeft = () => {
  ctx.beginPath()
  ctx.moveTo(250, 250, 20)
  ctx.lineTo(285, 190)
  ctx.strokeStyle = coulourBody
  ctx.stroke()
  ctx.closePath()
}

const drawLegRight = () => {
  ctx.beginPath()
  ctx.moveTo(295, 188)
  ctx.lineTo(330, 250)
  ctx.strokeStyle = coulourBody
  ctx.stroke()
  ctx.closePath()
}

const drawHead = () => {
  coulour = 'red'
  coulourBody = 'red'

  ctx.beginPath()
  ctx.arc(290, 100, 25, 0, Math.PI * 2)
  ctx.fillStyle = coulour
  ctx.fill()
  ctx.closePath()

  coulour = 'rgba(0, 0, 0, 0.2)'
}


//A GENERER DE MANIERE PLUS ELEGENTE...map ????????????????????????????????????????????????????????
let alphabet =  ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',' ']
//use alphabet pour generer le 
//delete les touches touchèes

document.getElementById('keyboard').innerHTML = `
 <div class="row justify-content-center">
  <div id="" class="key col-1">
    Q
  </div>
    <div id="" class=" key col-1">
    W
  </div>
    <div id="" class=" key col-1">
    E
  </div>
    <div id="" class=" key col-1">
    R
  </div>
    <div id="" class=" key col-1">
    T
  </div>
    <div id="" class=" key col-1">
    Y
  </div>
    <div id="" class=" key col-1">
    U
  </div>
    <div id="" class=" key col-1">
    I
  </div>
    <div id="" class=" key col-1">
    O
  </div>
    <div id="" class=" key col-1">
    P
  </div>
</div>  
<div class="row justify-content-center">  
  <div id="a" class="key col-1">
    A
  </div>
    <div id="" class="key col-1">
    S
  </div>
    <div id="" class="key col-1">
    D
  </div>
    <div id="" class="key col-1">
    F
  </div>
    <div id="" class="key col-1">
    G
  </div>
    <div id="" class="key col-1">
    H
  </div>
    <div id="" class="key col-1">
    J
  </div>
    <div id="" class="key col-1">
    K
  </div>
    <div id="" class="key col-1">
    L
  </div>
</div>
<div class="row justify-content-center">
  <div id="" class="key col-1">
    Z
  </div>  
    <div id="" class="key col-1">
    X
  </div>
    <div id="" class="key col-1">
    C
  </div>
    <div id="" class="key col-1">
    V
  </div><div id="" class="key col-1">
    B
  </div><div id="" class="key col-1">
    N
  </div><div id="" class="key col-1">
    M
  </div>
   <div id="space" class="key space row justify-content-center offset-3 col-6">
   </div>
</div>

  `

draw()

document.addEventListener('keydown', event => {

  let found = []
  const keyName = event.key

  if (solution.includes(keyName) === true) {
 
    solution.map((element) => {
      if (element === keyName) {
        found.push(keyName)
        array.push(keyName)
      } 
      else if (array.includes(element) === true) 
        found.push(element)
      else {
        console.log('down')
        // fonction RATER////////////////////////////////////////////////////////

        found.push(' _ ')
      }
    })
    document.getElementById('lettre').innerHTML = `<span class="find col-auto border border-danger"><h1>${found.join('').toUpperCase()}</h1></span>`
  // if (array.includes(keyName) === false && i > 0)
  }
  else
    i++

  if (found.join('') === word.name) {
    document.getElementById('lettre').innerHTML = `<span class="find col-auto border border-danger"><h1>BRAVO!</h1></span>`
}
 console.log(i)
 console.log(i)
 draw() 
})

// au click v1.2
// document.getElementById('a').addEventListener('click' , e => {
// console.log(e)
// solution.map( (element) => {
//  if (element === 'a')
//    found.push('a')
//  else
//    found.push('?')
//  })
// console.log(found)
// })
