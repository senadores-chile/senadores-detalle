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
        const representacion = {}
        const comisiones = [] // #div_comisiones_senadores
        const enlaces = []
        return Object.assign(senador, { representacion, comisiones, enlaces })
      })
  }
  return pMap(senadoresBase, mapper)
}
