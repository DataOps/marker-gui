if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  //var editor = MandrillAce.getInstance();
  // editor.setValue("Sooper!");

  // var editor = new ReactiveAce()
  // editor.attach("editor");

  var ace = AceEditor.instance("editor",{
    theme:"monokai", 
    mode:"html"
  });

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
