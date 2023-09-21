import IllegalStateException from '../../../../IllegalStateException.js';
import GeneralAppIdDecoder from './GeneralAppIdDecoder.js';
import AI01AndOtherAIs from './AI01AndOtherAIs.js';
import AnyAIDecoder from './AnyAIDecoder.js';
import AI013103decoder from './AI013103decoder.js';
import AI01320xDecoder from './AI01320xDecoder.js';
import AI01392xDecoder from './AI01392xDecoder.js';
import AI01393xDecoder from './AI01393xDecoder.js';
import AI013x0x1xDecoder from './AI013x0x1xDecoder.js';
export function createDecoder(information) {
    try {
        if (information.get(1)) {
            return new AI01AndOtherAIs(information);
        }
        if (!information.get(2)) {
            return new AnyAIDecoder(information);
        }
        var fourBitEncodationMethod = GeneralAppIdDecoder.extractNumericValueFromBitArray(information, 1, 4);
        switch (fourBitEncodationMethod) {
            case 4: return new AI013103decoder(information);
            case 5: return new AI01320xDecoder(information);
        }
        var fiveBitEncodationMethod = GeneralAppIdDecoder.extractNumericValueFromBitArray(information, 1, 5);
        switch (fiveBitEncodationMethod) {
            case 12: return new AI01392xDecoder(information);
            case 13: return new AI01393xDecoder(information);
        }
        var sevenBitEncodationMethod = GeneralAppIdDecoder.extractNumericValueFromBitArray(information, 1, 7);
        switch (sevenBitEncodationMethod) {
            case 56: return new AI013x0x1xDecoder(information, '310', '11');
            case 57: return new AI013x0x1xDecoder(information, '320', '11');
            case 58: return new AI013x0x1xDecoder(information, '310', '13');
            case 59: return new AI013x0x1xDecoder(information, '320', '13');
            case 60: return new AI013x0x1xDecoder(information, '310', '15');
            case 61: return new AI013x0x1xDecoder(information, '320', '15');
            case 62: return new AI013x0x1xDecoder(information, '310', '17');
            case 63: return new AI013x0x1xDecoder(information, '320', '17');
        }
    }
    catch (e) {
        console.log(e);
        throw new IllegalStateException('unknown decoder: ' + information);
    }
}
