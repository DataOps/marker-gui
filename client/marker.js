Template.paper.rendered = function () {


	var paper = d3.select('svg.paper');

	var atoms = Molecule.getAtoms();

	var scatter = atoms['ScatterPlot'];
	scatter = scatter();

	scatter.init([
		{label:"value1", "x":30, "y":40},
		{label:"value2", "x":50, "y":10},
		{label:"value3", "x":10, "y":140},
		{label:"value4", "x":80, "y":80}
	]);

	scatter.draw(paper);

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



Template.sidebar.rendered = function () {
	var ace = AceEditor.instance("editor",{
	  theme:"github", 
	  mode:"marker"
	});
};


















