const detalle = require('./')

detalle('Allamand').then(s => {
  console.log(JSON.stringify(s[0], null, 2))
})
