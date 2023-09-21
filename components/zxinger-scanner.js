import { html, css, LitElement } from 'https://cdn.jsdelivr.net/npm/lit@2/+esm'
import { BrowserMultiFormatReader, BrowserQRCodeReader } from 'https://cdn.jsdelivr.net/gh/chainparency/zxinger@0/index.js'

export class ZxingerScanner extends LitElement {

    static properties = {
        selectedDeviceId: { type: String },
        result: { type: String },
        codeReader: { type: Object },
        error: { type: Object },
    }

    static styles = [
        css` 
          .column {
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
          
        `
    ]

    constructor() {
        super()
        this.selectedDeviceId = ""
        this.result = ""

        this.codeReader = new BrowserMultiFormatReader()

        this.error = null
    }

    connectedCallback() {
        super.connectedCallback()
    }

    render() {
        console.log("render")
        return html`    
    <md-dialog id="dialog" @close=${this.dialogClose} @cancel=${this.dialogCancel}>
    <span slot="headline">Scan a code</span>
    <div slot="content">
        <div class="column">
            <div class="row">    
            <video id="video" width="300" height="200" style="border: 1px solid gray"></video>           
            </div>
            <div class="row"> 
            <pre>
              <code id="result">
                ${this.result}
              </code>
            </pre>               
            </div>
        </div>
    </div>
    <div slot="actions">
    <md-outlined-button type="button" @click=${this.close}>Cancel</md-outlined-button>
    <!-- <md-outlined-button type="button" @click=${this._choose}>Ok</md-outlined-button> -->
    </div>
</md-dialog>         
    `;
    }

    dialogClose() {
        console.log('dialogClose')
        this.reset()
    }

    dialogCancel() {
        // console.log('dialogCancel')
        // this.reset()
    }

    firstUpdated() {
        super.firstUpdated()
    }

    _choose() {
        this.dispatchEvent(new CustomEvent("change", { detail: { result: this.result } }))
        this.close()
    }

    close() {
        // this.reset()
        const dialog = this.renderRoot.querySelector('#dialog')
        dialog.close()
    }

    async start() {

        let controls = this.decodeOnce(this.codeReader, this.selectedDeviceId)

    }

    async decodeOnce(codeReader, selectedDeviceId) {
        let video = this.renderRoot.getElementById('video')
        // console.log('video', video)
        // console.log('this.selectedDeviceId', selectedDeviceId)
        try {
            let result = await codeReader.decodeFromInputVideoDevice(selectedDeviceId, video)
            console.log("RESULT:", result)
            this.result = result.text
            // auto close:
            this.dispatchEvent(new CustomEvent("change", { detail: { value: this.result } }))
            this.close()
        } catch (err) {
            console.error(err)
            this.error = err
        }
    }

    reset() {
        this.codeReader.reset()
        this.result = ''
    }

    async open() {
        const dialog = this.renderRoot.querySelector('#dialog')
        dialog.show()

        try {
            let videoInputDevices = await this.codeReader.listVideoInputDevices()
            // console.log('videoInputDevices', videoInputDevices)
            this.selectedDeviceId = videoInputDevices[0].deviceId
            if (videoInputDevices.length > 1) {
                this.selectedDeviceId = videoInputDevices[1].deviceId //back camera on mobile phones
            }
            this.start()

        } catch (err) {
            console.error(err)
        }
    }

}

customElements.define("xzinger-scanner", ZxingerScanner)