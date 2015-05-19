
var aceEditor;

function parse() {
	var text = aceEditor.getValue();
    var parsed = parser.parse(text)
    //var out = JSON.stringify(parsed, null, 4);
    //console.log(out)

    var data = [];
    var chartType = "";

    for (var i = 0; i < parsed.length; i++) {
        if (parsed[i].type == "data") {
        	if (parsed[i].value[0][0] && parsed[i].value[0][0] !== "undefined") {
        		// 2D array, we need to go deeper into the tree structure
        		var dataArray = parsed[i].value;

        		// Loop over all elements/arrays in data array
        		for (var j = 0; j < dataArray.length; j++) {
        			var temp = [];

        			// Insert every data value into temporary array
        			for (var k = 0; k < dataArray[j].length; k++) {
        				temp[k] = dataArray[j][k].value;
        			}

	        		// Assume label in data[j][0]. Values in rest.
	        		if (temp.length > 2) {
	        			// Insert temp array into data array. Remove first element and add the rest
        				data.push({label: temp.shift(), value: temp});
        			} else {
        				// Do not create new array, just return the values from temp array
        				data.push({label: temp[0], value: temp[1]});
        			}
        		}
        	} else {
        		// Just get the values straight out of AST tree and insert into data
	            for (var j = 0; j < parsed[i].value.length; j++) {
	                if (parsed[i].value[i].type == "file") {
	                    data = "";
	                    data = parsed[i].value[0].value;
	                    break;
	                } else if (parsed[i].value[i].type == ("int" || "string" || "double")) {
	                    data[j] = parsed[i].value[j].value;
	                }
	            }
	        }
        } else if (parsed[i].type == "type") {
        	// Chech what chart type we want to draw
            chartType = parsed[i].value;
        }
    }

    //console.log(data);

    var options = {};

    // Collect all options as title, color, label etc and insert to options array
	for (var i = 0; i < parsed.length; i++) {
		options[parsed[i].type] = parsed[i].value;
	};
	delete options.data;

	// Draw the graph with correct data and its options
	drawGraph(chartType, data, options);
};



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

	// var tmpTxt =
	// "-- My Chord Chart\n"+
	// "#data\n"+ 
	// 	"\tDavid John 10\n"+
	// 	"\tDavid Patrik 20\n"+
	// 	"\tDavid David 30\n"+
	// 	"\tPatrik David 40\n"+

	// "#type ChordChart\n"+
	// "#title My Chord Chart";

	var tmpTxt =
	"-- My Venn diagram\n"+
	"#data\n"+ 
		"\t'Set A' 1 2 3\n"+
		"\t'Set B' 1 4 5\n"+
		"\t'Set C' 1 6 7\n"+
	"#type VennDiagram\n"+
	"#title My Venn diagram";

// 	"-- My Venn diagram\n"+
// 	"#data\n"+ 
// 		"\t'Set A', 1, 2, 3\n"+
// 		"\t'Set B', 1, 4, 5\n"+
// 		"\t'Set C', 1, 6, 7\n"+
// 	"#type VennDiagram\n"+
// 	"#title My Venn diagram";


	// var tmpTxt =
	// "-- My Venn diagram\n"+
	// "#data\n"+ 
	// 	"\t'Set A', 10\n"+
	// 	"\t'Set B', 15\n"+
	// 	"\t'Set C', 20\n"+
	// "#type BarChart\n"+
	// "#title My Venn diagram";	


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


















