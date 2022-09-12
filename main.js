'use strict';

/*
 * Created with @iobroker/create-adapter v2.1.1
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
const axios = require('axios').default;

// variables
const isValidUrl = /https:\/\/meteo.netitservices.com\/api\/v0\/devices\/[a-zA-Z0-9]{12}\/poll\?hwtypeId=[0-9]{1,4}/;

class Hagelschutz extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: 'hagelschutz',
		});
		this.on('ready', this.onReady.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		// Initialize your adapter here
		this.log.info('starting adapter "hagelschutz"...');

		// Reset the connection indicator during startup
		this.setState('info.connection', false, true);

		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		this.log.debug(`config.url: ${this.config.url}`);

		// check url
		if (!isValidUrl.test(this.config.url)) {
			this.log.error('"Url" is not valid (allowed format: https://meteo.netitservices.com/api/v0/devices/xxxxxxxxxxxx/poll?hwtypeId=yyy) (ERR_#001)');
			return;
		}

		this.log.debug(`The configuration has been checked successfully. Trying to connect "${this.config.url}"...`);

		try {
			// create objects
			await this.createObjects();

			// get data
			await this.getHailData();
			await this.getHailDataByIntervall();

		} catch (error) {
			this.log.error(error);
		}
	}

	// https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md
	// https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles
	async createObjects() {
		this.log.debug('[createObjects]: start objects creation...');

		await this.setObjectNotExistsAsync('hailState', {
			type: 'state',
			common: {
				name: 'Hail State',
				desc: 'Hail State',
				type: 'number',
				role: 'value.hail',
				states: {0: 'no hail', 1: 'hail', 2: 'hail state triggered by test-alarm'},
				min: 0,
				max: 2,
				read: true,
				write: false
			},
			native: {}
		});

		this.log.debug('[createObjects]: Objects created...');
	}

	async getHailData() {
		await axios({
			method: 'GET',
			url: this.config.url
		})
			.then((response) => {
				this.log.debug(`[getHailData]: HTTP status response: ${response.status} ${response.statusText}; config: ${JSON.stringify(response.config)}; headers: ${JSON.stringify(response.headers)}; data: ${JSON.stringify(response.data)}`);

				this.setState('hailState', {val: response.data.currentState, ack: true});

				this.setState('info.connection', true, true);
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code that falls out of the range of 2xx
					this.log.debug(`[getHailData]: HTTP status response: ${error.response.status}; headers: ${JSON.stringify(error.response.headers)}; data: ${JSON.stringify(error.response.data)}`);
				} else if (error.request) {
					// The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
					this.log.debug(`[getHailData]: error request: ${error}`);
				} else {
					// Something happened in setting up the request that triggered an Error
					this.log.debug(`[getHailData]: error message: ${error.message}`);
				}
				this.log.debug(`[getHailData]: error.config: ${JSON.stringify(error.config)}`);

				this.setState('info.connection', false, true);
			});
	}

	async getHailDataByIntervall() {
		this.log.info('[getHailDataByIntervall]: Starting polltimer with a 120 seconds interval.');
		try {
			this.intervall = setInterval(async () => {
				await this.getHailData();
			}, 120 * 1000); // default-intervall: 120s
		} catch (error) {
			this.log.error(`${error}: (ERR_#002)`);
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			this.intervall && clearInterval(this.intervall);

			this.setState('info.connection', false, true);

			callback();
			this.log.info('cleaned everything up... (#1)');
		} catch (e) {
			callback();
			this.log.info('cleaned everything up... (#2)');
		}
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Hagelschutz(options);
} else {
	// otherwise start the instance directly
	new Hagelschutz();
}