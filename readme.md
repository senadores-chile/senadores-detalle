# senadores-detalle [![npm version](https://img.shields.io/npm/v/senadores-detalle.svg?style=flat-square)](https://www.npmjs.com/package/senadores-detalle) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores-detalle/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores-detalle) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> Detalle complementario a la información base de cada senador.

## Instalación

```bash
npm install --save senadores-detalle
```

## Uso

```javascript
var detalle = require('senadores-detalle')

detalle('Zaldívar')
    .then(senador => console.log(senador[0]))
/*
nombre: 'Zaldívar Larraín, Andrés',
  region: 'Región del Maule',
  circunscripcion: 10,
  telefono: '(56-32) 2504691',
  mail: 'azaldivar@senado.cl',
  partido: 'P.D.C.',
  representacion: {
    superficie: {
      cantidad: 2135443,
      medida: 'km2'
    },
    habitantes: 123135,
    distritos: [321,321,354,8,2,897,9,8],
    circunscripcion: 10,
    comunas: ['sad'. 'asd', 'wer']
  },
  enlaces: []
*/
```

## Otros enlaces

- [senadores-base](https://github.com/YerkoPalma/senadores-base) - Información basica y estatica de los senadores actuales de Chile.
- [senadores-asistencia](https://github.com/YerkoPalma/senadores-asistencia) - Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile.

## Licencia

[MIT](/license) © [Yerko Palma](https://github.com/YerkoPalma).
