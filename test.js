import test from 'ava'
import senadoresDetalle from './'

test('senadores-detalle fails when no senator', t => {
  return senadoresDetalle(112233)
    .then(() => t.fail())
    .catch(() => t.pass())
})

test('senadores-detalle works', async t => {
  t.plan(6)

  const detalleAllende = await senadoresDetalle('Allende')
  const detalleAllamand = await senadoresDetalle('Allamand')
  t.true(detalleAllende[0].hasOwnProperty('representacion'))
  t.true(detalleAllende[0].hasOwnProperty('enlaces'))
  t.true(detalleAllamand[0].hasOwnProperty('representacion'))
  t.true(detalleAllamand[0].hasOwnProperty('enlaces'))

  t.deepEqual(detalleAllende[0], {
    'id': 985,
    'nombre': 'Allende Bussi, Isabel',
    'rut': '4465782-1',
    'region': 'Región de Atacama',
    'circunscripcion': 3,
    'telefono': '(56-32) 2504671',
    'mail': 'iallende@senado.cl',
    'partido': 'P.S.',
    'representacion': {
      'superficie': {
        'cantidad': 75176,
        'medida': 'Km2'
      },
      'habitantes': 254336,
      'circunscripcion': '3 (Atacama)',
      'distritos': [
        5,
        6
      ],
      'comunas': [
        'Chañaral',
        'Copiapó',
        'Diego de Almagro',
        'Alto del Carmen',
        'Caldera',
        'Huasco',
        'Freirina',
        'Tierra Amarilla',
        'Vallenar'
      ]
    },
    'enlaces': [
      'http://twitter.com/iallendebussi',
      'http://www.facebook.com/senadoraisabelallende',
      'http://www.flickr.com/photos/isabelallendebussi',
      'http://www.isabelallendebussi.cl/'
    ]
  })

  t.deepEqual(detalleAllamand[0], {
    'id': 905,
    'nombre': 'Allamand Zavala, Andrés',
    'rut': '5002921-2',
    'region': 'Región Metropolitana ',
    'circunscripcion': 7,
    'telefono': '(56-32) 2504701',
    'mail': 'allamand@senado.cl',
    'partido': 'R.N.',
    'representacion': {
      'superficie': {
        'cantidad': 8423,
        'medida': 'Km2'
      },
      'habitantes': 2974692,
      'circunscripcion': '7 (Santiago Poniente)',
      'distritos': [
        16,
        17,
        18,
        19,
        20,
        22,
        30,
        31
      ],
      'comunas': [
        'Colina',
        'Lampa',
        'Quilicura',
        'Pudahuel',
        'Tiltil',
        'Conchalí',
        'Huechuraba',
        'Renca',
        'Quinta Normal',
        'Lo Prado',
        'Cerro Navia',
        'Independencia',
        'Recoleta',
        'Cerrillos',
        'Estación Central',
        'Maipú',
        'Santiago',
        'Buin',
        'Calera de Tango',
        'Paine',
        'San Bernardo',
        'Alhué',
        'Curacaví',
        'El Monte',
        'Isla de Maipo',
        'María Pinto',
        'Melipilla',
        'Padre Hurtado',
        'Peñaflor',
        'San Pedro',
        'Talagante'
      ]
    },
    'enlaces': []
  })
})
