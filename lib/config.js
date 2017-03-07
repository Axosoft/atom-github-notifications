module.exports = {
  personalAccessToken: {
    description: 'Your personal GitHub access token. Generate one [here](https://github.com/settings/tokens/new?description=Atom%20GitHub%20Notifications&scopes=notifications).',
    type: 'string',
    default: '',
    order: 1
  },
  pollInterval: {
    description: 'Interval (in minutes) at which the plugin polls GitHub for notifications',
    type: 'number',
    default: 1,
    order: 2
  },
  markReadOnDismiss: {
    description: 'Mark notifications as read on GitHub when dismissed',
    type: 'boolean',
    default: false,
    order: 3
  },
  showOnlyDirectParticipation: {
    description: 'Only show notifications for which I am directly participating',
    type: 'boolean',
    default: false,
    order: 4
  },
};
