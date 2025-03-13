/**
 * @typedef {Object} HttpRequest
 * @property {Object} body
 */

/**
 * @typedef {Object} HttpResponse
 * @property {number} statusCode
 * @property {Object} body
 */

/**
 * @typedef {Object} Controller
 * @property {(httpRequest: HttpRequest) => Promise<HttpResponse>} handle
 */

module.exports = {};