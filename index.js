//PENDU V
//TODO LIST
//check indice2 === suppression de lettre
//fetch pour check les Json
//horloge time canvas rond ?
  
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const word = {'id': 1, 'nb': 12, 'genre' : "feminin", 'name': 'photographie', 'img': '/img/photographie.jpg'}
const solution = word.name.split('')

const body = document.getElementById('body')
const help1 = document.getElementById('indice1')

let boucle = true
let dead = true
let array = []
 
let cases = '<span class="col-auto"></span><span class="youp col-auto border border-danger"><h1>?</h1></span>'

let route = 0
let i = -1
let time = 10


indice3 = help1.innerHTML = `<img class="rounded " width="80" src="indice.png" >`
indice1 = indice3
indice2 = indice3

let key =  [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
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

const indiceOne = [ 
  `Le mot est du genre ${word.genre}`, 
] 
const indiceTwo = [ 
  
  // supprimer 3 lettres
]

const indiceThree = () => {
  body.style.backgroundImage = "url('img/photographie.jpg')"
}

document.getElementById('lettre').innerHTML = cases.repeat(word.nb)



////////////////////FUNCTION//

/////////
//output
//random number
///////////////

const rdmNb = (min , max) => {
  let nb= Math.random() * (max - min) + min; 
  return Math.round(nb)
}




///////////////
//calcul time
//change color 
//for stress
///////////////

const addTime = () => {

ctx.clearRect(0, 0, 90, 80)

  drawTime()

    if ((time < 4 ) && time > 0 ){
      canvas.style.background = "red"
      canvas.style.border = '3px solid black'
    }
    else if (dead === false) {
      console.log('dedans')
      canvas.style.background = 'white'
      canvas.style.border = '3px solid red'
    }
    else
      canvas.style.background = 'black'


    time--

    if (time === 0){
      i++
      route++
      time = 10
      helpDeclencheur(route)   
      draw()
    }
    if (i >= 10){
       time = -1
    
    }
}



//////////////////////
//INDICEs injection
//and timmer for push
/////////////////////

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
  console.log("to indice delcencheur")
  help1.innerHTML = loupeIndice(indice1,indice2,indice3) 
  if (route === 1){
    

    indice1 = `<img class="invisible" width="80" src="indice.png" >`
    document.getElementById('useless').innerHTML = `<p>${indiceOne[rdmNb(0,5)]}</p>`
    help1.innerHTML = loupeIndice(indice1,indice2,indice3) 
  }
  
  else if (route === 2){
    indice3 = `<img class="invisible" width="80" src="indice.png" >`
    //action pour insice 2 sur keyboard
    help1.innerHTML = loupeIndice(indice1,indice2,indice3)
  }
  else if (route === 3){
    indice2 = `<img class="invisible" width="80" src="indice.png" >`
    indiceThree()    
    help1.innerHTML = loupeIndice(indice1,indice2,indice3)

  }
}

helpDeclencheur(route)
  

////////////////
//Drawing board
//with if forest
////////////////

const draw = () => {


if (dead === false){  
  document.addEventListener('keydown', listen)
  console.log(i)

  if (i === 0 && boucle === false){
    interval = setInterval(addTime , 300)
    i++
  }

  if (i <= 6 && i !== 5){
    drawPotence()
  }
  
  if (i === 5) {
      drawHead()
  }
  
  if (i >= 7 && i < 10)
    drawMembre()
  if (i === 10){
    dead = true
    draw()
  }
}
else{
  console.log('mort')
    ctx.clearRect(0, 0, 400, 300)
    drawText('GAME OVER')
    canvas.style.border = '2px solid red'
    document.getElementById('lettre').innerHTML = `<span class="invisible"><h1>GAME OVER</h1></span>`
    document.getElementById('body').style.background = 'black'
    body.addEventListener('click', restart)
    time = -1
  }
}


/////////////////////////////
//Elements are rdy to be draw
//let position =
// [x, y, w, h]
////////////////////////////

const drawRules = () =>{
    ctx.clearRect(0,0,150,150)
    ctx.beginPath()
    ctx.font="30px Courier";
    ctx.fillStyle = "black"
    ctx.fillText(`PENDU GAME`,115,50)
    ctx.moveTo(40, 60)
    ctx.lineTo(360, 60)
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.font="14px Courier"
    ctx.fillText(`1 - Trouver les maux avant le pendu`,40,95)
    ctx.fillText(`2 - Le mot qui nous concernes fait :`,40,125)
    ctx.fillText(` ${word.nb} lettres! `, 240 , 140)
    ctx.font="14px Courier";  
    ctx.fillText(`3 - Les touches touchèes disparaissent`,40,160)
    ctx.font="13px Courier";  
    ctx.fillText(`4 - Le mots est en Français , parfois...`,40,190)
    ctx.font="12px Courier";  
    ctx.fillText(`5 - Les indices seront fournis ...`,40,215)
    ctx.font="11px Courier";  
    ctx.fillText(`6 - Le Temps c'est cool`,40,240)
    ctx.font="10px Courier";  
    ctx.fillText(`7 - On se referre aux 6 precedentes`,40,265)
    ctx.closePath()
}


const drawTime = () => {
  ctx.beginPath()
  if (time < 4){
    ctx.font="45px Courier"
    ctx.fillStyle = "black"
  }
  else {
    ctx.font="30px Courier"
    ctx.fillStyle = "red"
  }
  ctx.fillText(`${time}`,45,45)
  ctx.closePath()
}

const drawText = (text) =>{
  ctx.beginPath()

  ctx.font="60px Courier";
  ctx.fillStyle = "red"
  ctx.fillText(`${text}`,45,150)
  ctx.font="20px Courier"
  if (i === 10)
    ctx.fillStyle = "white"
  else 
    ctx.fillStyle = "black"
  ctx.fillText(`Click pour rejouer`,90,200);
  ctx.closePath()

}

const drawPotence = () => {
  ctx.beginPath()
  ctx.rect(position[i][0], position[i][1], position[i][2], position[i][3])
  ctx.fillStyle = "black"
  ctx.fill()
  ctx.closePath()
}


const drawMembre = () => {
  ctx.beginPath()
  ctx.moveTo(position[i][0], position[i][1])
  ctx.lineTo(position[i][2],position[i][3])
  ctx.strokeStyle = "black"
  ctx.stroke()
  ctx.closePath()
}

const drawHead = () => {

  ctx.beginPath()
  // ctx.arc(290, 100, 25, 0, Math.PI * 2)
  ctx.arc(position[i][0],position[i][1],position[i][2],position[i][3], Math.PI * 2)
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
    const mapped1 = key[0].map(src => `<div id="lettre${src.toUpperCase()}" class="key col-1">${src}</div>`).join('')
    const mapped2 = key[1].map(src => `<div id="lettre${src.toUpperCase()}" class="key col-1">${src}</div>`).join('')
    const mapped3 = key[2].map(src => `<div id="lettre${src.toUpperCase()}" class="key col-1">${src}</div>`).join('')
    const mapped4 = key[3].map(src => `<div id="lettre${src.toUpperCase()}" class="key col-5">${src}</div>`).join('')

    return ` 
      <div class="row justify-content-center"> ${mapped1} </div>
      <div class="row justify-content-center"> ${mapped2} </div>
      <div class="row justify-content-center"> ${mapped3} </div>
      <div class="row justify-content-center"> ${mapped4} </div>
    `
}

document.getElementById('keyboard').innerHTML = makeKeyboard(key)


const removeKey = (keyName) =>{
  let index = 0

  if (key[0].includes(keyName)){
    index = (key[0].indexOf(keyName))
    console.log(index)
    delete key[0][index]
  }
  else if (key[1].includes(keyName)){
   index = (key[1].indexOf(keyName))
   console.log(index)
   delete key[1][index]
  }
  else if (key[2].includes(keyName)){
   index = (key[2].indexOf(keyName))
   console.log(index)
   delete key[2][index]   
  }
  else if (key[3].includes(keyName)){
    index = (key[3].indexOf(keyName))
    console.log(index)
    delete key[3][index]
  }
    document.getElementById('keyboard').innerHTML = makeKeyboard(key)

}


////////////////////////////////////////////////
//Compare input keyboard and array with solution
//if ok , make new array with same length but include only match key from input keyboard
//else draw on canvas and delete key to keyboard
//////////////////////////////////////////////// 

const listen = () =>{
  time = 10
  let found = []
  const keyName = event.key

  removeKey(keyName)

  if (boucle === true){
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
    document.getElementById('lettre').innerHTML = `<span class="find col-auto border border-danger"><h1>${found.join('').toUpperCase()}</h1></span>`
  }
  else
    i++
  
  if (found.join('') === word.name) {

    console.log('win')
    document.getElementById('lettre').innerHTML = `<span class="invisible"><h1>BRAVO!</h1></span>`
    ctx.clearRect(0, 0, 400, 300)
    drawText(' *BRAVO*')
    document.getElementById('canvas').style.background = 'white'
    document.getElementById('body').style.background = 'black'
    i = 11
    canvas.addEventListener('click', restart)

}
  
  if (i <= 10){
  draw() 
  }
}

//////////////////////
//Restart from refresh
//////////////////////
const restart = () =>{
  location.reload()
}


if (dead === true){
  drawRules()
}

document.addEventListener('keydown' , e =>{

if (dead === true){
  drawRules()
  ctx.clearRect(0, 0, 400, 300)
}  
  dead = false
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


  









