import { html, css, LitElement } from 'lit'
import '@material/web/button/filled-button.js'
// import '@material/web/button/outlined-button.js'
// import '@material/web/button/text-button.js'
// import '@material/web/iconbutton/icon-button.js'
// import '@material/web/iconbutton/filled-icon-button.js'
// import '@material/web/progress/circular-progress.js'
// import '@material/web/progress/linear-progress.js'
// import '@material/web/menu/menu.js'
// import '@material/web/menu/menu-item.js'
// import '@material/web/list/list.js'
// import '@material/web/list/list-item.js'
import '@material/web/dialog/dialog.js'
import './zxinger-scanner.js'

export class ZXingerDialog extends LitElement {

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

        this.error = null
    }

    connectedCallback() {
        super.connectedCallback()
    }

    render() {
        return html`
        <md-dialog id="dialog" @close=${this.dialogClose} @cancel=${this.dialogCancel}>
            <span slot="headline">Scan a code</span>
            <div slot="content">
                <div class="column">
                    <div class="row">    
                    <zxinger-scanner id="zxinger" @change=${this.changed}></zxinger-scanner>
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
        `
    }

    changed(e) {
        console.log("changed", e.detail.value)
        this.result = e.detail.value
        this.dispatchEvent(new CustomEvent("change", { detail: { value: this.result } }))
        this.close()
    }

    dialogClose() {
        console.log('dialogClose')
        this.reset()
    }

    reset() {
        this.renderRoot.querySelector("#zxinger").close()
        this.result = ''
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


    async open() {
        const dialog = this.renderRoot.querySelector('#dialog')
        dialog.show()

        let z = this.renderRoot.querySelector("#zxinger")

        try {
            z.start()
        } catch (err) {
            console.error(err)
        }
    }

}

customElements.define("xzinger-dialog", ZXingerDialog)
