class Options extends HTMLElement {
	static get observedAttributes() {
		return ['titles'];
	}
	
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.render();
		
		this.throbberProgress = 0;
	}
	
	render() {
		// сделала так, но можно еще вынести checkbox-ы и передать id и title
		const titlesString = this.getAttribute('titles');
		const titles = titlesString.split(',');
		
		const titleValue = titles[0];
		const titleAnimate = titles[1];
		const titleHide = titles[2];
		
		const styles = `
			input{
			  margin: 0;
			  padding: 0;
			}

			input[type="number"]::-webkit-inner-spin-button,
			input[type="number"]::-webkit-outer-spin-button {
			  -webkit-appearance: none;
			  margin: 0;
			}
			input[type="number"] {
	      -moz-appearance: textfield;
			}
			
			input[type="checkbox"].ios8-switch {
		    position: absolute;
		    margin: 8px 0 0 16px;
			}
			input[type="checkbox"].ios8-switch + label {
			  position: relative;
			  padding-left: 70px;
			  font-family: "GTEestiPro", arial, sans-serif;
			  font-weight: 500;
			}
			input[type="checkbox"].ios8-switch + label:before {
		    content: "";
		    position: absolute;
		    display: block;
		    left: 0;
		    top: 0;
		    width: 50px;
		    height: 25px;
		    border-radius: 16px;
		    background: #CCD6E4;
		    -webkit-transition: all 0.3s;
		    transition: all 0.3s;
			}
			input[type="checkbox"].ios8-switch + label:after {
		    content: "";
		    position: absolute;
		    display: block;
		    left: 3px;
		    top: 3px;
		    width: 19px;
		    height: 19px;
		    border-radius: 16px;
		    background: #fff;
		    -webkit-transition: all 0.3s;
		    transition: all 0.3s;
			}
			input[type="checkbox"].ios8-switch + label:hover:after {
			  box-shadow: 0 0 5px rgba(0,0,0,0.3);
			}
			input[type="checkbox"].ios8-switch:checked + label:after {
			  margin-left: 24px;
			}
			input[type="checkbox"].ios8-switch:checked + label:before {
			  background: #005bff;
			}

			.options {
				display: flex;
				flex-direction: column;
				gap: 20px;
			}
			
			.field{
				display: flex;
			}
			
			.labelValue{
				margin-left: 20px;
				font-family: "GTEestiPro", arial, sans-serif;
				font-weight: 500;
			}
			
			.value {
				display: flex;
				text-align: center;
				max-width: 47px;
				width: 100%;
				height: 22px;
				border: 1px solid #070707;
				border-radius: 20px;
			}
			.value:focus, .value:active {
			  outline: none;
			}
		`;
		
		this.shadowRoot.innerHTML = `
			<div class='options'>
				<div class='field'>
					<input
						id='number-1'
						class='value'
						type='number'
						max='100'
						min='0'
						value='0'
					>
					<label for='number-1' class='labelValue'>${titleValue}</label>
				</div>
				<div class='field'>
					<input
						id='checkbox-1'
						class='ios8-switch'
						type='checkbox'
					>
					<label for='checkbox-1' class='labelAnimate'>${titleAnimate}</label>
				</div>
				<div class='field'>
					<input
						id='checkbox-2'
						class='ios8-switch'
						type='checkbox'
					>
					<label for='checkbox-2'>${titleHide}</label>
				</div>
			</div>
		<style>${styles}</style>
		`;
		
		this.throbber = document.getElementById('throbber');
		this.throbber.progress = 0;
		
		this.inputValue = this.shadowRoot.querySelector('.value');
		this.inputHide = this.shadowRoot.querySelector('#checkbox-2');
		this.inputAnimate = this.shadowRoot.querySelector('#checkbox-1');
		
		this.inputValue.addEventListener('input', (event) => this.validateInput(event.target));
		this.inputHide.addEventListener('input', (event) => this.handleHideToggle(event.target));
		this.inputAnimate.addEventListener('input', (event) => this.handleAnimateToggle(event.target));
		
		this.updateControls();
	}
	
	 validateInput(input) {
			let value = Number(input.value);
			if (value < 0) {
				input.value = 0;
			}
			else if (value > 100) {
				input.value = 100;
			}
		 
		 if (this.throbber) {
			 this.throbber.progress = value;
			 this.throbberProgress = value;
		 } else {
			 console.error('Throbber element not found');
		 }
		 this.updateControls();
		 
		 if(this.throbberProgress === 0){
			 this.throbber.style.animation = '';
			 this.inputAnimate.checked = false;
		 }
	}
	
	handleHideToggle(input) {
		const isChecked = input.checked;
		this.throbber.style.display = isChecked ? 'none' : '';
		
		const optionsElement = this.shadowRoot.querySelector('.options');
		if (window.innerWidth < 330) {
			optionsElement.style.marginTop = isChecked ? '200px' : '0';
		} else {
			optionsElement.style.marginLeft = isChecked ? '200px' : '0';
		}
	}
	
	handleAnimateToggle(input) {
		const isChecked = input.checked;
		if (this.throbberProgress !== 0){
			this.throbber.style.animation = isChecked ? 'rotate 2s linear infinite' : '';
		}
	}
	
	updateControls() {
		const isDisabled = !this.throbberProgress;
		this.inputAnimate.disabled = isDisabled;
		
		this.shadowRoot.querySelector('.labelAnimate').style.color = isDisabled ? '#CCD6E4' : '#070707';
	}
}

customElements.define('options-element', Options);
