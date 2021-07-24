export default class Response {

	/**
	 * The source request
	 *
	 * @type {*}
	 */
	source;

	/**
	 * The request status code
	 *
	 * @type {Number}
	 */
	status;

	/**
	 * The request status text
	 *
	 * @type {String}
	 */
	statusText;

	/**
	 * The parsed request body
	 *
	 * @type {Object|null}
	 */
	body;

}
