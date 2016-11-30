'use strict'

const scraperjs = require('scraperjs')
const senadores = require('senadores-base')
const pMap = require('p-map')

const URL_DETALLE = 'http://www.senado.cl/appsenado/index.php?mo=senadores&ac=fichasenador&id=:senador-id:'

// Get the details of every senator
// (any, obj) -> arr
module.exports = function senadoresDetalle (query) {
  const senadoresBase = senadores(query)
  const mapper = senador => {
    const url = URL_DETALLE.replace(/:senador-id:/, senador.id)
    return scraperjs.StaticScraper.create()
      .get(url)
      .scrape($ => {
        let representacion = {}
        $('#main .seccion1 .aright ul.sans').first().find('li').each(function () {
          if ($(this).text().indexOf('Superficie') > -1) {
            representacion.superficie = {
              cantidad: $(this).text().split(' ')[1],
              medida: $(this).text().split(' ')[2]
            }
          }
          if ($(this).text().indexOf('Habitantes') > -1) {
            representacion.habitantes = $(this).text().split(' ')[1].replace(/\./g, '')
          }
          if ($(this).text().indexOf('Circunscripción') > -1) {
            representacion.circunscripcion = $(this).text().split(' ').slice(1).join(' ')
          }
          if ($(this).text().indexOf('Distritos') > -1) {
            representacion.distritos = $(this).text().split(' ').slice(1).map(elem => {
              return elem.replace(/,/g, '')
            }).filter(el => {
              return !isNaN(el)
            })
          }
        })
        representacion.comunas = $('.bajada').text().split(',')
        const comisiones = $('#div_comisiones_senadores table tr').map(function () {

        }).get()
        const enlaces = []
        return Object.assign(senador, { representacion, comisiones, enlaces })
      })
  }
  return pMap(senadoresBase, mapper)
}
