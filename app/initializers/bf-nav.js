export function initialize(container, application) {
  application.inject('component:bf-nav', 'router', 'router:main');
}

export default {
  name: 'bf-nav',
  initialize: initialize
};
