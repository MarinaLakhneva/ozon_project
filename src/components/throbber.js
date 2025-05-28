class Throbber extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		
		this.value = 0;
	}
	
	set progress(value) {
		this.value = Math.max(0, Math.min(100, value));
		this.render();
	}
	
	render() {
		const R = 70;
		const strokeWidth = 10;
		const circumference = 2 * Math.PI * R;
		const offset = circumference - (this.value / 100 * circumference);
		
		const styles =`
			svg {
				transform: rotate(-90deg);
			}
			
			.container {
				position: relative;
				width: 150px;
				height: 150px;
			}
			
			.background {
				fill: none;
				stroke: #CCD6E4;
				stroke-width: ${strokeWidth};
			}
			
			.progress {
				fill: none;
				stroke: #005bff;
				stroke-width: ${strokeWidth};
				transition: stroke-dashoffset 0.5s ease;
			}
		`;
		
		this.shadowRoot.innerHTML = `
			<div class='container'>
				<svg width="150" height="150">
					<circle class="background" cx="75" cy="75" r="${R}"/>
					<circle class="progress" cx="75" cy="75" r="${R}"
					        stroke-dasharray="${circumference}"
					        stroke-dashoffset="${offset}"
					/>
				</svg>
			</div>
			<style>${styles}</style>
		`;
	}
}

customElements.define('throbber-element', Throbber);
