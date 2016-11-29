import test from 'ava'
import senadoresDetalle from './'

test('senadores-detalle does something awesome', async t => {
  t.plan(3)

  const detalle = await senadoresDetalle('Allende')
  t.true(detalle[0].hasOwnProperty('representacion'))
  t.true(detalle[0].hasOwnProperty('comisiones'))
  t.true(detalle[0].hasOwnProperty('enlaces'))
})
