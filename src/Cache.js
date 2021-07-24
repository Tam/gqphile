export default class Cache {

	/**
	 * Cache for persistent, offline storage
	 *
	 * @type {PersistentStorageInterface}
	 * @private
	 */
	_persistentStorage;

	/**
	 * In-memory Storage
	 *
	 * @type {Object}
	 * @private
	 */
	_cache = {};

	/**
	 * @param options
	 */
	constructor (options = {
		persistentStorage: null,
		persistentStorageHandle: null,
	}) {
		if (options.persistentStorage && typeof window === 'object') {
			const handle =
				options.persistentStorageHandle
				?? window.location.host + ':gqphile_cache';
			this._persistentStorage = options.persistentStorage;
			this._persistentStorage.initialise(handle);
			this._cache = this._persistentStorage.restore(handle);
		}
	}

	set (key, value) {
		this._cache[key] = value;
		this._persistentStorage?.set(key, value);
	}

	has (key) {
		return this._cache.hasOwnProperty(key);
	}

	get (key) {
		return this._cache[key];
	}

	clear () {
		this._cache = {};
		this._persistentStorage?.clear();
	}

}
