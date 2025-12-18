/**
 * @typedef {'sales' | 'rent' | 'land' | 'commercial'} PropertyCategory
 */

/**
 * @typedef {object} Property
 * @property {string} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} address
 * @property {string} city
 * @property {number} beds
 * @property {number} baths
 * @property {number} sqft
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} imageUrl
 * @property {PropertyCategory} category
 * @property {boolean} [featured]
 */

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} email
 * @property {'admin' | 'user'} role
 */

/**
 * @typedef {object} AuthState
 * @property {User | null} user
 * @property {boolean} isAuthenticated
 */
