import Ember from 'ember';
import layout from '../templates/components/bf-nav';

export default Ember.Component.extend({
  layout: layout,
  routes: function() {
    var routes = Object.keys(this.get('router.router.recognizer.names'));
    routes = routes.filter(function(item) {
      return !item.endsWith('index') && !item.endsWith('loading') && !item.endsWith('error') && item !== 'application';
    }).map(function(item) {
      var name = item.split('.');
      name = name[name.length - 1];
      return {
        routeName: item,
        name: name.capitalize()
      };
    }).sortBy('name');
    // Add nested
    routes.forEach( function(route, index, enumerable) {
      if (route.routeName.indexOf('.') !== -1) { // nested
        var parentRoute = route.routeName.split('.');
        parentRoute.pop();
        parentRoute = parentRoute.join('.');
        parentRoute = routes.findBy('routeName', parentRoute);
        if (parentRoute.children == undefined) {
          parentRoute.children = [];
        }
        parentRoute.children.pushObject(route);
      }
    });
    // Remove redundant objects
    var revisedRoutes = [];
    routes.forEach( function(route) {
      if (route.routeName.indexOf('.') == -1) {
        revisedRoutes.pushObject(route);
      }
    });
    revisedRoutes.unshiftObject({ routeName: 'index', name: 'Home' });
    return revisedRoutes;
  }.property('router.router.recognizer.names')
});

Ember.LinkView.reopen({
  attributeBindings: ['data-toggle', 'role', 'aria-expanded']
});
