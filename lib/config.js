module.exports = {
  personalAccessToken: {
    description: 'Your personal GitHub access token. Generate one [here](https://github.com/settings/tokens).',
    type: 'string',
    default: '',
    order: 1
  },
  pollInterval: {
    description: 'Interval (in minutes) at which the plugin polls GitHub for notifications',
    type: 'number',
    default: 1,
    order: 2
  }
};
