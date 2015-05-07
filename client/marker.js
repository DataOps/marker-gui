var aceEditor;

function parse() {
	var text = aceEditor.getValue();
//	console.log(text);
    var parsed = parser.parse(text)
    var output = JSON.stringify(parsed, null, 4);
    console.log("parsed output: " + output);	
}

Template.index.rendered = function () {
	  particlesJS('particles', {
	    particles: {
	      color: '#ddd',
	      color_random: false,
	      shape: 'circle', // "circle", "edge" or "triangle"
	      opacity: {
	        opacity: .8,
	        anim: {
	          enable: true,
	          speed: 1.5,
	          opacity_min: 0,
	          sync: false
	        }
	      },
	      size: 4,
	      size_random: true,
	      nb: 150,
	      line_linked: {
	        enable_auto: true,
	        distance: 100,
	        color: '#ddd',
	        opacity: 1,
	        width: 1,
	        condensed_mode: {
	          enable: false,
	          rotateX: 600,
	          rotateY: 600
	        }
	      },
	      anim: {
	        enable: false,
	        speed: 1
	      }
	    },
	    interactivity: {
	      enable: true,
	      mouse: {
	        distance: 500
	      },
	      detect_on: 'canvas', // "canvas" or "window"
	      mode: 'grab', // "grab" of false
	      line_linked: {
	        opacity: .5
	      },
	      events: {
	        onclick: {
	          enable: true,
	          mode: 'push', // "push" or "remove"
	          nb: 4
	        },
	        onresize: {
	          enable: true,
	          mode: 'out', // "out" or "bounce"
	          density_auto: false,
	          density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
	        }
	      }
	    },
	    /* Retina Display Support */
	    retina_detect: true
	  });
};
// meteor add newswim:particles

Template.sidebar.rendered = function () {
	var tmpTxt =
	"-- My chart by Lorem Ipsum\n"+
	"#data: 1,2,3,4,5,6,7,8,9,10,20,25,30,40,50\n"+
	"#type: barchart\n"+
	"#color: red\n"+
	"@lowest:\n"+
	"\tlabel: lowest\n"+
	"#title: My Chart";

	var langTools = ace.require("ace/ext/language_tools");
	aceEditor = ace.edit("editor");
	aceEditor.setOptions({
		enableBasicAutocompletion: true
	});
	aceEditor.setTheme("ace/theme/clouds");
	aceEditor.getSession().setMode("ace/mode/marker");
	aceEditor.insert(tmpTxt);

	// Does not work? Morre???
	var codeSuggestion = {
		getCompletions: function(editor, session, pos, prefix, callback) {
			if (prefix.length === 0) {
				callback(null, []);
				return
			} else {
				$.getJSON("chartTypes.json", function(wordList) {
					callback(null, wordList.map(function(ea) {
						return {
							name: ea.name,
							value: ea.name,
							meta: "chartType"
						}
					}));
				})
			}
		}
	}

	langTools.addCompleter(codeSuggestion);
};

Template.sidebar.events({
	'click .shoot': function() {
		parse();
	}
})

// Template.sidebar.events({
//   'click .edit': function () {
//     $('.sidebar').toggleClass('show-sidebar');
    
//     var importPos = $('.import').css('left') == '-200px' ? '0' : '-200px';
//     $('.import').animate({
//       'left' : importPos
//     }, 100);
//     var topPos = $('.top-btn').css('left') == '-200px' ? '50%' : '-200px';
//     $('.top-btn').animate({
//       'left' : topPos
//     }, 200);
//     // $('#editor').css({'height': 'calc(100% - 140px - 5vh)', 'width': '90%'});
//   },
//   'click .top-btn': function (e) {
//     var t = $(e.target);
//     if (!(t.eq(0).hasClass('top-btn-active'))) {
//       $('.top-btn').toggleClass('top-btn-active')
//     }
//   }
// });
