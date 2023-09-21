import { html, css, LitElement } from 'lit'
import { BrowserMultiFormatReader } from 'https://cdn.jsdelivr.net/gh/chainparency/zxinger@0/index.js'

export class ZXingerScanner extends LitElement {

    static properties = {
        selectedDeviceId: { type: String },
        result: { type: String },
        codeReader: { type: Object },
        error: { type: Object },
    }

    static styles = css``

    constructor() {
        super()
        this.selectedDeviceId = ''
        this.result = ''

        this.codeReader = new BrowserMultiFormatReader()

        this.error = null
    }

    connectedCallback() {
        super.connectedCallback()
    }

    render() {
        return html`
            <video id="video" width="300" height="200" style="border: 1px solid gray"></video>           
    `
    }

    close() {
        this.reset()
    }


    reset() {
        this.codeReader.reset()
        this.result = ''
    }

    async start() {
        let controls = this.decodeOnce(this.codeReader, this.selectedDeviceId)

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


}

customElements.define("xzinger-scanner", ZXingerScanner)