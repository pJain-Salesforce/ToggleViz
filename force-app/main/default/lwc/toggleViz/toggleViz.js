import { LightningElement, api } from 'lwc';

export default class ToggleViz extends LightningElement {
    @api getState;
    @api setState;
    @api parentToggle;
    @api childToggle;

    // Initializes the component
    connectedCallback() {
        window.top.addEventListener('message', (e) => {   
          if (e.origin === window.location.origin && window.parent === parent) {
                const receivedData = e.data;
                if(receivedData?.payload?.step === this.parentToggle && receivedData.payload.data){
                //if(receivedData.payload && receivedData.payload.step && receivedData.payload.step === this.parentToggle && receivedData.payload.data){
                  const newState ={
                    "pageId": this.getState().pageId,
                    "state": {
                      "steps": {
                        [this.childToggle]: {
                          "values": [receivedData.payload.data[0].Display],
                          "metadata": { "groups": ["Display"] }
                        }
                      }
                    },
                    "replaceState": true
                  };
                  this.setState(newState);
                }           
            }                        
        }, false);
    }
}