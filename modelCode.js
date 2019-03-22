window.app = window.app || {};
window.app.modelCode = function(codes) {
    'use strict'
    const minModelCodeLength = 11,
        qLedTvConfig = ['region', 'screenSize', 'series'],
        standardTVConfig = ['region', 'screenSize', 'year', 'matrixType', 'series', 'digitalTuner'];
    
    function prepareInput(input) {
        let result;
        if (!input) {
            result = false;
        } else {
            let modelCode = input.trim();
            if (modelCode.length < minModelCodeLength) {
                result = false;
            } else {
                result = modelCode.toUpperCase();
            }
        }
        return result;
    }

    function positionParser(modelCodeKey, modelCode, beginIndex) {
        let codeMap = codes[modelCodeKey],
            result;
        
        for (let i = codeMap.tokenRange.length - 1; i >= 0; i--) {
            let range = codeMap.tokenRange[i],
                token = modelCode.slice(beginIndex, beginIndex + range),
                tokenTranslation;

            if (!token.length) {
                continue;
            } else {
                if (codeMap.tokenFormat === 'DIGITAL') {
                    tokenTranslation = token;
                    result = { code: tokenTranslation, name: tokenTranslation, range: range, modelCodeKey: modelCodeKey };
                    break;
                } else if (codeMap.tokenFormat === 'STRING') {
                    if (tokenTranslation = codeMap.tokenMap[token]) {
                        result = { code: token, name: tokenTranslation, range: range, modelCodeKey: modelCodeKey };
                        break;
                    } else if (codeMap.tokenEmptyValue) {
                        result = { code: 'EMPTY', name: codeMap.tokenEmptyValue, range: 0, modelCodeKey: modelCodeKey };
                        break;
                    }
                } else {
                    throw 'unsupported tokenFormat: ' + codeMap.tokenFormat;
                }
            }
        }
        if (!result) {
            throw 'Can not find modelCodeKey: ' + modelCodeKey;
        }
        return result;
    }

    function serialPositionParser(modelCode, series) {
        let currentStartPosition = 0,
            result = {};
        for (let i = 0; i < series.length; i++) {
            let modelCodeKey = series[i];
            if (!modelCodeKey.range) { // not calculated item
                modelCodeKey = positionParser(modelCodeKey, modelCode, currentStartPosition);
            }
            currentStartPosition += modelCodeKey.range;
            result[modelCodeKey.modelCodeKey] = {
                code: modelCodeKey.code,
                name: modelCodeKey.name
            };
        }
        return result;
    }

    function parseModelCode(modelCode) {
        try {
            let deviceType = positionParser('deviceType', modelCode, 0),
                serialModelInfo;
            if (deviceType.code === 'Q') { // QDOT TV
                serialModelInfo = serialPositionParser(modelCode, [deviceType].concat(qLedTvConfig))
            } else { // regular TV or unknown TV
                serialModelInfo = serialPositionParser(modelCode, [deviceType].concat(standardTVConfig));
            }
            return serialModelInfo;
        } catch(e) {
            console.error(e);
        }
    }

    function modelCodeToModelInfo(inputModelCode) {
        let modelCode = prepareInput(inputModelCode),
            result;
        if (!modelCode) {
            result = false;
        } else {
            result = parseModelCode(modelCode);
        }
        return result;
    }

    return {
        parse: modelCodeToModelInfo
    };

}(window.app.modelCodeData);