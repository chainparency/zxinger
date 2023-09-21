var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Exception from './Exception.js'
/**
 * Custom Error class of type Exception.
 */
var WriterException = /** @class */ (function (_super) {
    __extends(WriterException, _super);
    function WriterException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriterException.kind = 'WriterException';
    return WriterException;
}(Exception));
export default WriterException;
