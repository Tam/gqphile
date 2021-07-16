import Cache from './Cache';

export default class Client {

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
	} = {}) {
		this.uri = uri;
		this.wsUri = wsUri;

		this._cache = new Cache({
			persistentStorage,
		});

		console.log('Client Created!');
	}

}
