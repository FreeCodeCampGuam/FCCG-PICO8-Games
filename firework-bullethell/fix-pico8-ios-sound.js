
(function() {
  // fetch original file name
  var s = document.scripts[document.scripts.length - 1]
  var file = s.getAttribute('data-original-file')
  if (!file) throw new Error('Missing data-original-file attribute.')

  // strip vendor prefixes
  window.AudioContext = window.AudioContext
    || window.webkitAudioContext
    || window.mozAudioContext
    || window.oAudioContext
    || window.msAudioContext

  // make AudioContext a singleton so we control it
  var ctx = new window.AudioContext
  window.AudioContext = function() { return ctx }

  // create overlay
  var o = document.createElement('div')
  o.setAttribute("style",
    ['position: fixed',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'background: #222',
    // 'background: rgba(128, 128, 128, 0.5)',
    ].map(function(q) {return q + ';'}).join(""))

  var po = document.createElement('div')
  po.innerHTML = '<img src="https://freecodecampguam.github.io/FCCG-PICO8-Games/Assets/UI/play.png" style=" margin: auto; max-width: 100%;max-height: 100%;">' //freedcodecamp.github.io/FCCG-PICO8-Games/Assets/UI/play.png
  po.setAttribute("style",
    ['position: fixed',
    'top: 0',
    'left: 0', 
    'right:0',
    'bottom:0',
    'background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("icon.png") no-repeat center',
    'background-size:contain',
    'margin: auto',
    'display: flex',
    'max-height: 80%',
    'max-width: 80%',
    ].map(function(p) {return p + ';'}).join(""))
  // o.style.cssText = [
  //   'position: fixed',
  //   'top: 0',
  //   'left: 0',
  //   'right: 0',
  //   'bottom: 0',
  //   'background: rgb(128, 128, 128)',
  //   'background: rgba(128, 128, 128, 0.5)',
  //   'color: white',
  //   'text-align: center',
  //   'padding-top: 200px',
  // ].map(function(p) { return p + ';' }).join('')
  o.appendChild(po);
  document.body.appendChild(o)

  // disable scrolling
  document.body.style.overflow = 'hidden'
  o.onclick = function() {

    // ...until overlay is clicked
    document.body.style.overflow = ''

    // then unlock AudioContext on iOS
    var buffer = ctx.createBuffer(1, 1, 22050)
    var source = ctx.createBufferSource()
    source.connect(ctx.destination)
    if (source.noteOn) source.noteOn(0)
    else source.start(0)

    // dynamically load original script
    var s = document.createElement('script')
    s.setAttribute('src', file)
    document.body.appendChild(s)

    // and delete overlay div
    document.body.removeChild(o)
  }
})()
