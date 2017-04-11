'use strict'

const scraperjs = require('scraperjs')
const senadores = require('senadores-base')
const pMap = require('p-map')

const URL_DETALLE = 'http://www.senado.cl/appsenado/index.php?mo=senadores&ac=fichasenador&id=:senador-id:'

// Get the details of every senator
// (any, obj) -> arr
module.exports = function senadoresDetalle (query) {
  const senadoresBase = senadores(query)
  if (!senadoresBase || senadoresBase.length < 1) return Promise.reject(new Error('No se encontraron senadores para ' + query))
  const mapper = senador => {
    const url = URL_DETALLE.replace(/:senador-id:/, senador.id)
    return scraperjs.StaticScraper.create()
      .get(url)
      .scrape($ => {
        let representacion = {}
        $('#main .seccion1 .aright ul.sans').first().find('li').each(function () {
          if ($(this).text().indexOf('Superficie') > -1) {
            representacion.superficie = {
              cantidad: parseInt($(this).text().split(' ')[1].replace(/\./g, '')),
              medida: $(this).text().split(' ')[2]
            }
          }
          if ($(this).text().indexOf('Habitantes') > -1) {
            representacion.habitantes = parseInt($(this).text().split(' ')[1].replace(/\./g, ''))
          }
          if ($(this).text().indexOf('Circunscripción') > -1) {
            representacion.circunscripcion = $(this).text().split(' ').slice(1).join(' ')
          }
          if ($(this).text().indexOf('Distritos') > -1) {
            representacion.distritos = $(this).text().split(' ').slice(1).map(elem => {
              return elem.replace(/,/g, '')
            }).filter(el => {
              return !isNaN(el)
            }).map(e => parseInt(e))
          }
        })
        representacion.comunas = $('.bajada').text().split(',').map(comuna => comuna.trim())
        const enlaces = $('#main .seccion1 .aright ul.sans').eq(1).find('li a').map(function () {
          return $(this).attr('href')
        }).get()
        return Object.assign(senador, { representacion, enlaces })
      })
  }
  return pMap(senadoresBase, mapper)
}
