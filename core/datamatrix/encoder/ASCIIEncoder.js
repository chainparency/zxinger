import { ASCII_ENCODATION, BASE256_ENCODATION, C40_ENCODATION, EDIFACT_ENCODATION, LATCH_TO_ANSIX12, LATCH_TO_BASE256, LATCH_TO_C40, LATCH_TO_EDIFACT, LATCH_TO_TEXT, TEXT_ENCODATION, UPPER_SHIFT, X12_ENCODATION, } from './constants.js';
// tslint:disable-next-line:no-circular-imports
import HighLevelEncoder from './HighLevelEncoder.js';
var ASCIIEncoder = /** @class */ (function () {
    function ASCIIEncoder() {
    }
    ASCIIEncoder.prototype.getEncodingMode = function () {
        return ASCII_ENCODATION;
    };
    ASCIIEncoder.prototype.encode = function (context) {
        // step B
        var n = HighLevelEncoder.determineConsecutiveDigitCount(context.getMessage(), context.pos);
        if (n >= 2) {
            context.writeCodeword(this.encodeASCIIDigits(context.getMessage().charCodeAt(context.pos), context.getMessage().charCodeAt(context.pos + 1)));
            context.pos += 2;
        }
        else {
            var c = context.getCurrentChar();
            var newMode = HighLevelEncoder.lookAheadTest(context.getMessage(), context.pos, this.getEncodingMode());
            if (newMode !== this.getEncodingMode()) {
                switch (newMode) {
                    case BASE256_ENCODATION:
                        context.writeCodeword(LATCH_TO_BASE256);
                        context.signalEncoderChange(BASE256_ENCODATION);
                        return;
                    case C40_ENCODATION:
                        context.writeCodeword(LATCH_TO_C40);
                        context.signalEncoderChange(C40_ENCODATION);
                        return;
                    case X12_ENCODATION:
                        context.writeCodeword(LATCH_TO_ANSIX12);
                        context.signalEncoderChange(X12_ENCODATION);
                        break;
                    case TEXT_ENCODATION:
                        context.writeCodeword(LATCH_TO_TEXT);
                        context.signalEncoderChange(TEXT_ENCODATION);
                        break;
                    case EDIFACT_ENCODATION:
                        context.writeCodeword(LATCH_TO_EDIFACT);
                        context.signalEncoderChange(EDIFACT_ENCODATION);
                        break;
                    default:
                        throw new Error('Illegal mode: ' + newMode);
                }
            }
            else if (HighLevelEncoder.isExtendedASCII(c)) {
                context.writeCodeword(UPPER_SHIFT);
                context.writeCodeword(c - 128 + 1);
                context.pos++;
            }
            else {
                context.writeCodeword(c + 1);
                context.pos++;
            }
        }
    };
    ASCIIEncoder.prototype.encodeASCIIDigits = function (digit1, digit2) {
        if (HighLevelEncoder.isDigit(digit1) && HighLevelEncoder.isDigit(digit2)) {
            var num = (digit1 - 48) * 10 + (digit2 - 48);
            return num + 130;
        }
        throw new Error('not digits: ' + digit1 + digit2);
    };
    return ASCIIEncoder;
}());
export { ASCIIEncoder };
