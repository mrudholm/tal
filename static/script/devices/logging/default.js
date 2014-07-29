	/**
	 * @fileOverview Requirejs module containing base antie.devices.logging.default class.
	 * @author Chris Darlaston <christopher.darlaston@bbc.co.uk>
	 * @version 1.0.0
	 */
require.def(
	'antie/devices/logging/default',
	[
		'antie/devices/browserdevice'
	],
	function(Device) 
	{
		var enabledLevels = null;
		var loggingMethods = {
			/**
			 * Sets the iterator pointer to the first item
			 */
			log: function() {
				if(enabledLevels.info) {
					console.log.apply(console, arguments);
				}
			},
			debug: function() {
				if(enabledLevels.debug) {
					console.debug.apply(console, arguments);
				}
			},						
			info: function() {
				if(enabledLevels.info) {
					console.info.apply(console, arguments);
				}
			},			
			warn: function() {
				if(enabledLevels.warn) {
					console.warn.apply(console, arguments);
				}
			},		
			error: function() {
				if(enabledLevels.error) {
					console.error.apply(console, arguments);
				}
			}
		};
		
		Device.prototype.getLogger = function() {
			if(!enabledLevels) {
				enabledLevels = {};
				var loggingConfig = this.getConfig().logging;
				if(loggingConfig) {
					var level = loggingConfig.level;
					switch(level) {
						case 'all':
						case 'debug':
							enabledLevels.debug = true;
						case 'info':
							enabledLevels.info  = true;
						case 'warn':
							enabledLevels.warn  = true;
						case 'error':
							enabledLevels.error = true;
					}
				}				
			}
			return loggingMethods;
		};
	}
);