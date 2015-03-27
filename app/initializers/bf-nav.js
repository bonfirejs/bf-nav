export function initialize(container) {
  var router = container.lookup('router:main');
  container.register('service:router', router, { instantiate: false });
}

export default {
  name: 'bf-nav',
  initialize: initialize
};
