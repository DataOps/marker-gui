
var aceEditor;


function formatParsedData (parsed) {
	var data = {};
	for (var i = 0; i < parsed.length; i++) {
		data[parsed[i].type] = parsed[i].value;
		// delete data[parsed[i].type].type;
	};

	// console.log(data)

	return data;
}

function parse() {
	var text = aceEditor.getValue();
    var parsed = parser.parse(text)
    // var out = JSON.stringify(parsed, null, 4);
    // console.log(out)



    var output = formatParsedData(parsed);

    var data = [];
    var cycleSize = 2;
    for (var i = 0; i < output.data.length; i=i+cycleSize) {
    	data.push({
    		label: output.data[i].value,
    		value: output.data[i+1].value
    	})
    };

    var type = output.type;


   // Deep copy for options
   var options = $.extend(true, {}, output);
   delete options.data;


   drawGraph(type, data, options);
};

// [Log] parsed output: [ (marker.js, line 10)
//     {
//         "type": "comment",
//         "value": null
//     },
//     {
//         "type": "data",
//         "value": [
//             {
//                 "type": "string",
//                 "value": "Patrik"
//             },
//             {
//                 "type": "int",
//                 "value": 52
//             },
//             {
//                 "type": "string",
//                 "value": "Jimmy"
//             },
//             {
//                 "type": "int",
//                 "value": 32
//             },
//             {
//                 "type": "string",
//                 "value": "Morhag"
//             },
//             {
//                 "type": "int",
//                 "value": 62
//             },
//             {
//                 "type": "string",
//                 "value": "John"
//             },
//             {
//                 "type": "int",
//                 "value": 12
//             }
//         ]
//     },
//     {
//         "type": "type",
//         "value": "barchart"
//     },
//     {
//         "type": "color",
//         "value": "red"
//     },
//     {
//         "type": "lowest",
//         "value": [
//             {
//                 "type": "string",
//                 "value": "label"
//             }
//         ]
//     },
//     "lowest",
//     {
//         "type": "title",
//         "value": "My Chart"
//     }
// ]


var currentType;
function drawGraph (type, data, options) {
	var paper = d3.select('svg.paper')
		.attr('height', 400)
		.attr('width', Math.min($(document).width(),1200))


	// clear if other type
	if(type != currentType && currentType){
		paper.selectAll('*').remove();
	};

	var atoms = Molecule.getAtoms();

	var bc = atoms[type];
	bc = bc();

	bc.init(data,options);

	bc.draw(paper);

	currentType = type;
};


Template.index.rendered = function () {
	  // particlesJS('particles', {
	  //   particles: {
	  //     color: '#ddd',
	  //     color_random: false,
	  //     shape: 'circle', // "circle", "edge" or "triangle"
	  //     opacity: {
	  //       opacity: .8,
	  //       anim: {
	  //         enable: true,
	  //         speed: 1.5,
	  //         opacity_min: 0,
	  //         sync: false
	  //       }
	  //     },
	  //     size: 4,
	  //     size_random: true,
	  //     nb: 150,
	  //     line_linked: {
	  //       enable_auto: true,
	  //       distance: 100,
	  //       color: '#ddd',
	  //       opacity: 1,
	  //       width: 1,
	  //       condensed_mode: {
	  //         enable: false,
	  //         rotateX: 600,
	  //         rotateY: 600
	  //       }
	  //     },
	  //     anim: {
	  //       enable: false,
	  //       speed: 1
	  //     }
	  //   },
	  //   interactivity: {
	  //     enable: true,
	  //     mouse: {
	  //       distance: 500
	  //     },
	  //     detect_on: 'canvas', // "canvas" or "window"
	  //     mode: 'grab', // "grab" of false
	  //     line_linked: {
	  //       opacity: .5
	  //     },
	  //     events: {
	  //       onclick: {
	  //         enable: true,
	  //         mode: 'push', // "push" or "remove"
	  //         nb: 4
	  //       },
	  //       onresize: {
	  //         enable: true,
	  //         mode: 'out', // "out" or "bounce"
	  //         density_auto: false,
	  //         density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
	  //       }
	  //     }
	  //   },
	  //   /* Retina Display Support */
	  //   retina_detect: true
	  // });
};
// meteor add newswim:particles




Template.sidebar.rendered = function () {

	// "#data: 1,2,3,4,5,6,7,8,9,10,20,25,30,40,50\n"+


	var tmpTxt =
	"-- Try overriding the title attribute\n"+
	"#data\n"+
		"\tPatrik 42\n"+
		"\tJimmy 32\n"+
		"\tMorhag 62\n"+
		"\tJohn 12\n"+
		"\n" +
	"#type BarChart\n"+
	"\n" +
	"#color red\n"+
	"\n" +
	"@lowest\n"+
	"\tlabel lowest\n";

	var langTools = ace.require("ace/ext/language_tools");
	aceEditor = ace.edit("editor");
	aceEditor.setOptions({
		enableBasicAutocompletion: true,
		enableLiveAutocompletion: true
	});
	aceEditor.setTheme("ace/theme/clouds");
	aceEditor.getSession().setMode("ace/mode/marker");

	aceEditor.$blockScrolling = Infinity; // Remove warn text in console

	aceEditor.commands.addCommand({
		name: 'myCommand',
		bindKey: {
			win: 'Ctrl-Enter',
			mac: 'Command-Enter'
		},
		exec: function(editor) {
			//console.log("ENTER PRESSED");
			parse();
		},
		readOnly: true // false if this command should not apply in readOnly mode
	});

	aceEditor.insert(tmpTxt);

	var codeSuggestion = {
		getCompletions: function(editor, session, pos, prefix, callback) {
			if (prefix.length === 0) {
				callback(null, []);
				return
			} else {
				$.getJSON("/scripts/chartTypes.json", function(wordList) {
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





	///init
	parse();
};

Template.sidebar.events({
	'click .shoot': function() {
		parse();
	},

	'click .download': function() {
		Blaze.saveAsPDF(Template.bigGraph, {
			filename: "graph.pdf", // optional, default is "document.pdf"
			orientation: "landscape", // optional, "landscape" or "portrait" (default)
			unit: "cm", // optional, unit for coordinates, one of "pt", "mm" (default), "cm", or "in"
			format: "a4" // optional, see Page Formats, default is "a4"
		});
	}	
});

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



// Template.sidebar.rendered = function () {
// 	var ace = AceEditor.instance("editor",{
// 	  theme:"github", 
// 	  mode:"marker"
// 	});
// };


















