let winWheel = {
	options: {
		'showSpinButton'    : true,
		'enableSwiped'      : false,
		/*'canvasWidth'       : 434,
		'canvasHeight'      : 434,
		'bgWinWheelWidth'   : 434,
		'bgWinWheelHeight'  : 434,*/
		'canvasWidth'       : 250,
		'canvasHeight'      : 250,
		'bgWinWheelWidth'   : 250,
		'bgWinWheelHeight'  : 250,
		'outerRadius'  : 212,
		'drawText'          : true,       
		'textFontSize'      : 16,         
		'textOrientation'   : 'curved',
		'textAlignment'     : 'inner',
		'textMargin'        : 130,
		'textFontFamily'    : 'monospace',
		'textStrokeStyle'   : 'black',
		'textLineWidth'     : 3,
		'textFillStyle'     : 'yellow',
		'segments': [{
				"image": "http://grooden.com/img/jane.png",
				"value": 1,
				"text" : "Prize 1"
			}, {
				"image": "http://grooden.com/img/tom.png",
				"value": 2,
				"text" : "Prize 2"
			}, {
				"image": "http://grooden.com/img/mary.png",
				"value": 3,
				"text" : "Prize 3"
			}, {
				"image": "http://grooden.com/img/alex.png",
				"value": 4,
				"text" : "Prize 4"
			}, {
				"image": "http://grooden.com/img/sarah.png",
				"value": 5,
				"text" : "Prize 5"
			}, {
				"image": "http://grooden.com/img/bruce.png",
				"value": 6,
				"text" : "Prize 6"
			}, {
				"image": "http://grooden.com/img/rose.png",
				"value": 7,
				"text" : "Prize 7"
			}, {
				"image": "http://grooden.com/img/steve.png",
				"value": 8,
				"text" : "Prize 8"
		}],
		'numSegments'  : 8,
		'drawMode'     : 'segmentImage'
	},
	canvas: null,
	canvasWrapper: null,
	wheel: null,
	ctx: null,
	scaleRatio: 0.7,
	winSeg: null,
	spinning: false,
	resize() {
		if (!this.spinning) {
			let cw = this.canvasWrapper.offsetWidth * 0.9
			cw = cw > 500 ? 500 : cw
			let size = cw > 350 ? 350 : cw
			this.canvas.width = size
			this.canvas.height = size
			this.ctx.translate(size * (1 - this.scaleRatio) / 2, size * (1 - this.scaleRatio) / 2)
			this.ctx.scale(this.scaleRatio, this.scaleRatio)
			const wheelOptions = Object.assign({
	          'animation'    : {
	            'type'     : 'spinToStop',
	            'duration' : 5,
	            'spins'    : 4,
	            'callbackFinished' : function(slide) {
					console.log(slide)
	            	// console.log(`fin ${slide}`)
	            }
	          }
	        }, this.options);

			this.wheel = new window.Winwheel(wheelOptions)
			if (this.winSeg) {
				this.wheel.animation.stopAngle = this.wheel.getRandomForSegment(this.winSeg);
			}
		}
	},
	// ratio: null,
	init(spinBtn, winSeg) {
		this.canvas = document.getElementById('canvas')
		this.ctx = this.canvas.getContext("2d")
		this.canvasWrapper = document.getElementById('page-wrapper')
		this.spinBtn = document.getElementById(spinBtn)
		this.winSeg = winSeg || null
		window.addEventListener('resize', ()=>{this.resize()}, false);
		this.resize();
		
		if (this.spinBtn) {
			this.spinBtn.addEventListener('click', () => {
				this.startSpin()
			})
		}
	},
	startSpin() {
		if (!this.spinning) {
			if (this.spinBtn) {
				this.spinBtn.setAttribute('disabled', 'true')
			}
			this.wheel.startAnimation()
			this.spinning = true
		}
	}
}

export default winWheel;