if (Meteor.isClient) {

  var ace = AceEditor.instance("editor",{
    theme:"monokai", 
    mode:"html"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
