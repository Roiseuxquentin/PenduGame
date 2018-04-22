//PENDU GAME
//V1.2

//fetch pour check les Json
//Code en cour de d'optimisation algo/style

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const enseigne = document.getElementById('enseigne')
const ctxPub = enseigne.getContext('2d')

const wordList = [{ 'id': 1, 'nb': 12, 'genre': "feminin", 'name': 'photographie', 'img': '/img/photographie.jpg' },
{ 'id': 2, 'nb': 4, 'genre': "masculin", 'name': 'geek', 'img': '/img/geek.jpg' },
{ 'id': 3, 'nb': 10, 'genre': "masculin", 'name': 'hologramme', 'img': '/img/' },
{ 'id': 4, 'nb': 12, 'genre': "masculin", 'name': 'cumulonimbus', 'img': '/img/' },
{ 'id': 5, 'nb': 6, 'genre': "feminin", 'name': 'mouette', 'img': '/img/' },
{ 'id': 6, 'nb': 10, 'genre': "indefinis", 'name': 'formidable', 'img': '/img/' },
{ 'id': 7, 'nb': 13, 'genre': "indefinis", 'name': 'extraordinaire', 'img': '/img/' },
{ 'id': 8, 'nb': 7, 'genre': "masculin", 'name': 'clavier', 'img': '/img/' },
{ 'id': 9, 'nb': 2, 'genre': "indefinis", 'name': 'or', 'img': '/img/' },
{ 'id': 10, 'nb': 6, 'genre': "feminin", 'name': 'cigale', 'img': '/img/' },
{ 'id': 11, 'nb': 9, 'genre': "feminin", 'name': 'pirouette', 'img': '/img/' },]

const body = document.getElementById('body')
const help1 = document.getElementById('indice1')
let bgColor = 'bg-light'

let boucle = true
let dead = true
let array = []


let route = 0
let i = -1
let time = 10
let publi = 0
let posPub = 370


indice3 = help1.innerHTML = `<img class="rounded " width="80" src="indice.png" >`
indice1 = indice3
indice2 = indice3

let key = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  [' '],
]

let position = [[50, 280, 300, 30],
[50, 280, 300, 20],
[111, 280, 20, -353],
[111, 0, 180, 20],
[280, 0, 20, 80],
[290, 100, 25, 0,],
[285, 125, 10, 70],
[285, 130, 260, 190],
[295, 130, 320, 190],
[250, 250, 285, 190],
[295, 188, 330, 250],]





/////////
//output
//random number
///////////////

const rdmNb = (min, max) => {
  let nb = Math.random() * (max - min) + min;
  return Math.round(nb)
}

///////////
//Structure
//letters
//////////

const word = wordList[rdmNb(0, wordList.length - 1)]
const solution = word.name.split('')
let pub = ["Press or Click Pour Debuter !",
  "A la fin des 3 premiers chronos",
  "Des indices tu auras.. ",
  "Consone ou voyelle ?",]

let cases = '<span class="col-auto"></span><span class="youp col-auto border border-danger"><h1>?</h1></span>'
document.getElementById('lettre').innerHTML = cases.repeat(word.nb)

////////////////////FUNCTION//

///////////////
//calcul time
//change color 
//for stress
///////////////

const addTime = () => {

  ctx.clearRect(0, 0, 90, 80)

  drawTime()

  if ((time < 4) && time > 0) {
    canvas.style.background = "red"
    canvas.style.border = '3px solid black'

  }
  else if (dead === false) {
    canvas.style.background = 'white'
    canvas.style.border = '3px solid red'
  }
  else if (i === 11)
    canvas.style.background = 'white'
  else
    canvas.style.background = 'black'

  time--

  if (time === 0) {
    if (route > 2)
      i++
    if (route < 4)
      route++
    time = 10
    helpDeclencheur(route)
    draw()
  }
  if (i >= 10) {
    time = -1

  }
}



//////////////////////
//INDICEs injection
/////////////////////

const indiceTwo = (nbkill) => {
  let i = 0
  const arr = []
  while (i < nbkill) {
    let diff = key[i].filter(element => !solution.includes(element));
    let diffRdm = rdmNb(0, diff.length - 1)
    arr.push(`${diff[diffRdm]}`)
    removeKey(diff[diffRdm])
    i++
  }
  pub.push(`Il n'y a pas les lettres : ${arr.join('').split('')}`)
  pub.pop
}

const indiceThree = () => {
  body.style.backgroundImage = `url('img/${word.name}.jpg')`
}

const loupeIndice = () => {

  return `
      <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-auto indice1">${indice1}
          </div>
            <div class="col-auto indice2">${indice2}
          </div>
            <div class="col-auto indice3">${indice3}
          </div>
        </div>
      </div>
      `

}


const helpDeclencheur = (route) => {

  help1.innerHTML = loupeIndice(indice1, indice2, indice3)
  if (route === 1) {
    indice1 = `<img class="invisible" width="80" src="indice.png" >`
    help1.innerHTML = loupeIndice(indice1, indice2, indice3)
    pub = [' ',
      `Le mot est du genre ${word.genre}`,
      `Le mot fait ${word.nb} lettres !`]



  }

  else if (route === 2) {
    indiceTwo(2)
    indice3 = `<img class="invisible" width="80" src="indice.png" >`
    //action pour insice 2 sur keyboard
    help1.innerHTML = loupeIndice(indice1, indice2, indice3)
  }
  else if (route === 3) {
    indice2 = `<img class="invisible" width="80" src="indice.png" >`
    //   indiceThree()    
    help1.innerHTML = loupeIndice(indice1, indice2, indice3)
    indiceTwo(3)
  }
  else
    return
}

helpDeclencheur(route)


////////////////
//Drawing board
//with if forest...
////////////////

const draw = () => {

  if (pub[pub.length - 1] === undefined)
    delete pub[pub.length - 1]

  if (dead === false) {
    document.addEventListener('click', klick)
    document.addEventListener('keydown', listen)
    if (i === 0 && boucle === false) {
      interval = setInterval(addTime, 1000)
      i++
    }

    if (i <= 6 && i !== 5) {
      drawPotence()
    }

    if (i === 5) {
      drawHead()
    }

    if (i >= 7 && i < 10)
      drawMembre()
    if (i === 10) {
      dead = true
      draw()
    }
  }
  else {
    ctx.clearRect(0, 0, 400, 300)
    drawText('GAME OVER')
    dead = true
    canvas.style.border = '2px solid red'
    document.getElementById('lettre').innerHTML = `<span class="invisible"><h1>GAME OVER</h1></span>`
    document.getElementById('body').style.background = 'black'
    body.addEventListener('click', restart)
    body.addEventListener('keydown', restart)

  }
}


/////////////////////////////
//Elements are rdy to be draw
//let position =
// [x, y, w, h]
////////////////////////////

const drawRules = () => {
  let i = 0
  const rules = ['1 - Trouver les maux avant le pendu',
    `2 - Le mot compte ${word.nb} lettres! `,
    '3 - Il est surement Français...',
    '4 - Les premiers temps c cool',
    '5 - Des indices tu auras...',
    '6 - Apres touche les touches ',
    '7 - Mais pas toutes ... ',
    `8 - GL & HF`]

  ctx.clearRect(0, 0, 150, 150)
  ctx.beginPath()
  ctx.font = "30px Courier";
  ctx.fillStyle = "black"
  ctx.fillText(`PENDU GAME`, 115, 50)
  ctx.moveTo(40, 60)
  ctx.lineTo(360, 60)
  ctx.stroke()
  while (i < 8) {
    ctx.font = `${15 - i}px Courier`
    ctx.fillText(`${rules[i]}`, 40, 95 + (25 * (i++)))
    ctx.closePath()
  }
}


const drawTime = () => {

  if (dead === false) {
    ctx.beginPath()
    if (time < 4) {
      ctx.arc(10, -10, 100, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()
      ctx.font = "80px Courier"
      ctx.fillStyle = "red"
      ctx.fillText(`${time}`, 20, 60)
    }
    else {
      ctx.arc(10, -10, 100, 0, Math.PI * 2)
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.font = "40px Courier"
      ctx.fillStyle = "white"
      ctx.fillText(`${time}`, 20, 50)
    }
    ctx.closePath()
  }
}

const drawText = (text) => {
  ctx.beginPath()

  ctx.font = "60px Courier";
  ctx.fillStyle = "red"
  ctx.fillText(`${text}`, 40, 150)
  ctx.font = "20px Courier"
  if (i === 10)
    ctx.fillStyle = "white"
  else
    ctx.fillStyle = "black"
  ctx.fillText(`Press or Click pour rejouer`, 50, 200);
  ctx.closePath()

}

const drawPotence = () => {
  ctx.beginPath()
  ctx.rect(position[i][0], position[i][1], position[i][2], position[i][3])
  ctx.fillStyle = "black"
  ctx.fill()
  ctx.closePath()
}



const drawPub = () => {

  ctxPub.clearRect(0, 0, 400, 30)

  if (posPub <= -500) {
    posPub = 400
    publi++
  }
  else if (publi > pub.length - 1)
    publi = 1
  else if (dead === true) {
    ctxPub.beginPath()
    ctxPub.font = "22px Courier"
    ctxPub.fillStyle = "white"
    ctxPub.fillText(`${word.name.toUpperCase()}`, 150, 20)
    ctxPub.closePath()
  }
  else {
    posPub -= 5
    ctxPub.beginPath()
    ctxPub.font = "20px Courier"
    if (time > 3)
      ctxPub.fillStyle = "white"
    else
      ctxPub.fillStyle = "red"
    ctxPub.fillText(`${pub[publi]}`, posPub, 20)
    ctxPub.closePath()
  }
}


const drawMembre = () => {
  ctx.beginPath()
  ctx.moveTo(position[i][0], position[i][1])
  ctx.lineTo(position[i][2], position[i][3])
  ctx.strokeStyle = "black"
  ctx.stroke()
  ctx.closePath()
}

const drawHead = () => {

  ctx.beginPath()
  // ctx.arc(290, 100, 25, 0, Math.PI * 2)
  ctx.arc(position[i][0], position[i][1], position[i][2], position[i][3], Math.PI * 2)
  ctx.fillStyle = "white"
  ctx.fill()
  ctx.strokeStyle = "black"
  ctx.stroke()
  ctx.closePath()
}


//////////
//keyboard
////////// 

const makeKeyboard = () => {

  let i = 0
  const keyboard = []

  while (i < key.length) {
    const mapped = key[i].map(arrLine => `<div id="lettre${arrLine.toUpperCase()}" class="key text-uppercase col-1">${arrLine}</div>`).join('')
    keyboard.push(`<div class="row bg-inverse text-white justify-content-center"> ${mapped}</div>`)
    i++
  }

  return keyboard
}

const removeKey = (keyName) => {
  let index
  let i = 0


  while (i < key.length) {
    if (key[i].includes(keyName)) {
      index = (key[i].indexOf(keyName))
      delete key[i][index]
    }
    i++
  }

  // key = key.map(arrLine => {
  //    delete key[arrLine].indexOf(keyName)
  //  })
  document.getElementById('keyboard').innerHTML = makeKeyboard(key)
}

document.getElementById('keyboard').innerHTML = makeKeyboard(key)
/////////////
//MOUSE CLICK
/////////////

const klick = () => {

  time = 10
  let found = []
  const keyName = event.target.innerHTML

  removeKey(keyName)

  if (boucle === true) {
    addTime()
    boucle = false
  }


  if (solution.includes(keyName) === true) {

    solution.map((element) => {
      if (element === keyName) {

        found.push(keyName)
        array.push(keyName)
      }
      else if (array.includes(element))
        found.push(element)
      else {
        // fonction RATER////////////////////////////////////////////////////////

        found.push(' _ ')
      }
    })
    document.getElementById('lettre').innerHTML = `<span class="bg-light  col-auto border border-danger"><h1>${found.join('').toUpperCase()}</h1></span>`
  }
  else
    i++

  if (found.join('') === word.name) {

    document.getElementById('lettre').innerHTML = `<span class="invisible"><h1>BRAVO!</h1></span>`
    ctx.clearRect(0, 0, 400, 300)
    drawText(' *BRAVO*')
    dead = true
    document.getElementById('canvas').style.background = 'white'
    document.getElementById('body').style.background = 'black'
    i = 11
    body.addEventListener('click', restart)
    body.addEventListener('keydown', restart)

  }

  if (i <= 10) {
    draw()
  }
}
//////////////////////
//Restart from refresh
//////////////////////
const restart = () => {
  location.reload()
}

////////////////////////////////////////////////
//Compare input keyboard and array with solution
//if ok , make new array with same length but include only match key from input keyboard
//else draw on canvas and delete key to keyboard
//////////////////////////////////////////////// 

const listen = () => {

  time = 10
  let found = []
  const keyName = event.key

  removeKey(keyName)

  if (boucle === true) {
    addTime()
    boucle = false
  }


  if (solution.includes(keyName) === true) {

    solution.map((element) => {
      if (element === keyName) {

        found.push(keyName)
        array.push(keyName)
      }
      else if (array.includes(element))
        found.push(element)
      else {
        // fonction RATER////////////////////////////////////////////////////////

        found.push(' _ ')
      }
    })
    document.getElementById('lettre').innerHTML = `<span class="bg-light  col-auto border border-danger"><h1>${found.join('').toUpperCase()}</h1></span>`
  }
  else
    i++

  if (found.join('') === word.name) {

    document.getElementById('lettre').innerHTML = `<span class="invisible"><h1>BRAVO!</h1></span>`
    ctx.clearRect(0, 0, 400, 300)
    drawText(' *BRAVO*')
    dead = true
    document.getElementById('canvas').style.background = 'white'
    document.getElementById('body').style.background = 'black'
    i = 11
    body.addEventListener('click', restart)
    body.addEventListener('keydown', restart)

  }

  if (i <= 10) {
    draw()
  }
}

/////////////////////
//START
////////////////////
drawRules()

const starter = () => {
  if (dead === true) {
    dead = false
    ctx.clearRect(0, 0, 400, 300)
    setInterval(drawPub, 30)
    drawTime()
  }
  draw()
}

document.addEventListener('keydown', starter)
document.addEventListener('click', starter)