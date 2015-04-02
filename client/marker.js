if (Meteor.isClient) {

  Template.sidebar.helpers({
    // counter: function () {
    //   return Session.get('counter');
    // }
  });

  Template.sidebar.events({
    'click .edit': function () {
      $('.sidebar').toggleClass('show-sidebar');
      setTimeout(function () {
        $('.import').toggleClass('show-import');
      }, 250)
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
