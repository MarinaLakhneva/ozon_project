(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.value=0}set progress(t){this.value=Math.max(0,Math.min(100,t)),this.render()}render(){const o=2*Math.PI*70,e=o-this.value/100*o,s=`
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
				stroke-width: 10;
			}
			
			.progress {
				fill: none;
				stroke: #005bff;
				stroke-width: 10;
				transition: stroke-dashoffset 0.5s ease;
			}
		`;this.shadowRoot.innerHTML=`
			<div class='container'>
				<svg width="150" height="150">
					<circle class="background" cx="75" cy="75" r="70"/>
					<circle class="progress" cx="75" cy="75" r="70"
					        stroke-dasharray="${o}"
					        stroke-dashoffset="${e}"
					/>
				</svg>
			</div>
			<style>${s}</style>
		`}}customElements.define("throbber-element",a);class c extends HTMLElement{static get observedAttributes(){return["titles"]}constructor(){super(),this.attachShadow({mode:"open"}),this.render(),this.throbberProgress=0}render(){const i=this.getAttribute("titles").split(","),o=i[0],e=i[1],s=i[2],r=`
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
		`;this.shadowRoot.innerHTML=`
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
					<label for='number-1' class='labelValue'>${o}</label>
				</div>
				<div class='field'>
					<input
						id='checkbox-1'
						class='ios8-switch'
						type='checkbox'
					>
					<label for='checkbox-1' class='labelAnimate'>${e}</label>
				</div>
				<div class='field'>
					<input
						id='checkbox-2'
						class='ios8-switch'
						type='checkbox'
					>
					<label for='checkbox-2'>${s}</label>
				</div>
			</div>
		<style>${r}</style>
		`,this.throbber=document.getElementById("throbber"),this.throbber.progress=0,this.inputValue=this.shadowRoot.querySelector(".value"),this.inputHide=this.shadowRoot.querySelector("#checkbox-2"),this.inputAnimate=this.shadowRoot.querySelector("#checkbox-1"),this.inputValue.addEventListener("input",n=>this.validateInput(n.target)),this.inputHide.addEventListener("input",n=>this.handleHideToggle(n.target)),this.inputAnimate.addEventListener("input",n=>this.handleAnimateToggle(n.target)),this.updateControls()}validateInput(t){let i=Number(t.value);i<0?t.value=0:i>100&&(t.value=100),this.throbber?(this.throbber.progress=i,this.throbberProgress=i):console.error("Throbber element not found"),this.updateControls(),this.throbberProgress===0&&(this.throbber.style.animation="",this.inputAnimate.checked=!1)}handleHideToggle(t){const i=t.checked;this.throbber.style.display=i?"none":"";const o=this.shadowRoot.querySelector(".options");window.innerWidth<330?o.style.marginTop=i?"200px":"0":o.style.marginLeft=i?"200px":"0"}handleAnimateToggle(t){const i=t.checked;this.throbberProgress!==0&&(this.throbber.style.animation=i?"rotate 2s linear infinite":"")}updateControls(){const t=!this.throbberProgress;this.inputAnimate.disabled=t,this.shadowRoot.querySelector(".labelAnimate").style.color=t?"#CCD6E4":"#070707"}}customElements.define("options-element",c);const d=`
		p{
			margin: 0;
			padding: 0;
		}
		
		#app{
		  display: flex;
		  flex-direction: column;
      height: calc(100vh - 60px);
		}
		
		.title{
			font-family: "GTEestiPro", arial, sans-serif;
			font-size: 16px;
		}
		
		.content{
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 50px;
			flex: 1;
		}
		
		@media (max-width: 330px) {
	    .content {
	        flex-direction: column;
	    }
		}
		
		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
`;document.querySelector("#app").innerHTML=`
  <header class='header'>
	  <p class='title'>Progress</p>
  </header>
  <div class='content'>
    <throbber-element id="throbber"></throbber-element>
    <options-element titles='${["Value","Animate","Hide"]}'></options-element>
	</div>
  <style>${d}</style>
`;
