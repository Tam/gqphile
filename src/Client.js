import Cache from './Cache';
import { print } from 'graphql';

const iota = (i => () => 1 << ++i)(-1);

export default class Client {

	// Constants
	// =========================================================================

	// Returns
	// -------------------------------------------------------------------------

	// Retry the last request
	RETRY = iota();

	// Resend the last websocket message
	WS_RETRY = iota();

	// Resend the websocket authentication message
	WS_AUTH = iota();

	// Properties
	// =========================================================================

	// Public
	// -------------------------------------------------------------------------

	/**
	 * The URI of the GraphQL API
	 *
	 * @type {string}
	 */
	uri;

	/**
	 * The URI of the GraphQL API WebSocket
	 * Required for subscriptions and live queries
	 *
	 * @type {string|null}
	 */
	wsUri = null;

	/**
	 * Callback before a request is sent
	 *
	 * @type {Function|null}
	 */
	onRequest;

	/**
	 * Callback after a response is received
	 *
	 * @type {Function|null}
	 */
	onResponse;

	/**
	 * Callback after a request errors
	 *
	 * @type {Function|null}
	 */
	onError;

	// Private
	// -------------------------------------------------------------------------

	/**
	 * The cache store
	 *
	 * @type {Cache}
	 */
	_cache;

	// Constructor
	// =========================================================================

	constructor ({
		uri,
		wsUri,
		persistentStorage,
		onRequest,
		onResponse,
		onError,
	} = {}) {
		this.uri = uri;
		this.wsUri = wsUri;
		this.onRequest = onRequest;
		this.onResponse = onResponse;
		this.onError = onError;

		this._cache = new Cache({
			persistentStorage,
		});
	}

	// Functions
	// =========================================================================

	async send (query, variables = {}, options = {}) {
		const rawGql = query.loc.source.body;
		console.log(print(query));
	}



}
