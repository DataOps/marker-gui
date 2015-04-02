if (Meteor.isClient) {

  Template.sidebar.helpers({
    // counter: function () {
    //   return Session.get('counter');
    // }
  });

  Template.sidebar.events({
    'click .edit': function () {
      $('.sidebar').toggleClass('show-sidebar');
      
      var importPos = $('.import').css('left') == '-200px' ? '0' : '-200px';
      $('.import').animate({
        'left' : importPos
      }, 100);
      var topPos = $('.top-btn').css('left') == '-200px' ? '50%' : '-200px';
      $('.top-btn').animate({
        'left' : topPos
      }, 200);
    },
    'click .top-btn': function (e) {
      var t = $(e.target);
      if (!(t.eq(0).hasClass('top-btn-active'))) {
        $('.top-btn').toggleClass('top-btn-active')
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
