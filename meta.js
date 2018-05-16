module.exports = {
	helpers: {
		if: function(conditional, options) {
			if (conditional) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		}
	},
	prompts: {
		name: {
			type: 'string',
			required: true,
			message: 'Project name'
		},
		description: {
			type: 'string',
			message: 'Project description',
			default: 'Nuxt.js + Vuetify.js + Apollo project'
		},
		author: {
			type: 'string',
			message: 'Author'
		},
		alacarte: {
			type: 'confirm',
			message: 'Use a-la-carte components?',
			default: false
		},
		httpUrl: {
			type: 'string',
			required: true,
			message: 'Your Graphql URL, eg: http://your.api.url'
		},
		isWs: {
			type: 'confirm',
			message: 'Use Subscription?',
			default: false
		},
		wsUrl: {
			when: 'isWs',
			type: 'string',
			required: true,
			message: 'Your Graphql URL, eg: ws://your.api.url'
		},
		isAuth: {
			type: 'confirm',
			message: 'Use management token?',
			default: false
		},
		token: {
			when: 'isAuth',
			type: 'string',
			required: true,
			message: 'Your API Token'
		}
	},
	completeMessage:
		'{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};
