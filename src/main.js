import './style.css'
import './components/throbber';
import './components/options';

const styles =`
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
`;

document.querySelector('#app').innerHTML = `
  <header class='header'>
	  <p class='title'>Progress</p>
  </header>
  <div class='content'>
    <throbber-element id="throbber"></throbber-element>
    <options-element titles='${['Value', 'Animate', 'Hide']}'></options-element>
	</div>
  <style>${styles}</style>
`
