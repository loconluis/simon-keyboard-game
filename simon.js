const levels = 15;
let keys = generateKeys(levels);

function nextRound(currentLevel){
  if(currentLevel == levels){
    //Alertas usando sweetAlert
    return swal({
      title: 'Ganaste',
      type: 'success'
    });
  }

  swal({
    timer: 1000,
    title: `Nivel ${currentLevel + 1}`,
    showConfirmButton: false
  });

  for(let i=0; i <=currentLevel; i++){
    setTimeout(function(){activate(keys[i])}, 1000*(i+1) + 300);
  }

  let i = 0;
  let currentKey = keys[i];
  window.addEventListener('keydown', onkeydown);

  function onkeydown(ev){
    if(ev.keyCode == currentKey){
      activate(currentKey, {success: true});
      i++;
      if(i>currentLevel){
        window.removeEventListener('keydown', onkeydown);
        setTimeout(function(){nextRound(i);}, 1500);
      }
      currentKey = keys[i];
    }else{
      activate(ev.keyCode, {fail: true});
      window.removeEventListener('keydown', onkeydown);
      setTimeout(function(){
        swal({
          title: "Perdiste :(",
          text: "¿Quieres jugar de nuevo?",
          confirmButtonText: "¡Si!",
          showCancelButton: true,
          cancelButtonText: "No >:("
        }, function(ok){
          if(ok){generateKeys(levels);
          nextRound(0)
          }
        })}, 700);
    }
  }
}

nextRound(0);
//Generar teclas
function generateKeys(levels){
  //nos devuelve teclas aleatorias
  return new Array(levels).fill(0).map(generateAloneKey);
}
//Genera solo una tecla
function generateAloneKey(){
  const min= 65;
  const max= 90;
  return Math.round(Math.random() * (max-min) + min);
}

//Seleccionar alguna letra cuando se presione en el teclado
function getElementByKeyCode(keyCode){
  return document.querySelector(`[data-key="${keyCode}"]`);
}
//Activar elemento
function activate(keyCode, opts={}){
  const el = getElementByKeyCode(keyCode);
  el.classList.add('active');
  if(opts.success){
    el.classList.add('success');
  }else if(opts.fail){
    el.classList.add('fail');
  }
  setTimeout(function(){
    deactivate(el)
  }, 500);
}
//Desactiva el elemento
function deactivate(el){
  el.className = 'key';
}
