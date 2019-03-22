window.app = window.app || {};
window.app.modelCodeData = {
    // Code reference https://www.samsung.com/uk/support/tv-audio-video/what-do-samsung-tv-model-numbers-actually-mean-why-are-they-so-long/
    deviceType: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenMap: {
            'Q': 'QLED TV',
            'U': 'LED',
            'P': 'PLASMA',
            'L': 'LCD',
            'H': 'DLP',
            'K': 'OLED'
        }
    },
    region: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenMap: {
            'E': 'EUROPE',
            'N': 'NORTH AMERICA',
            'A': 'ASIA'
        }
    },
    year: {
        tokenRange: [1, 2],
        tokenFormat: 'STRING',
        tokenMap: {
            'A': '2008',
            'B': '2009',
            'C': '2010',
            'D': '2011',
            'E': '2012',
            'F': '2013',
            'H': '2014',
            'HU': '2014 UHD',
            'L': '2015',
            'K': '2016',
            'KU': '2016 UHD',
            'KS': '2016 SUHD',
            'M': '2017',
            'MU': '2017 UHD',
            'Q': '2017 QLED',
            'N': '2018'
        }
    },
    matrixType: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenEmptyValue: 'FULL HD',
        tokenMap: {
            'S': 'SUHD',
            'U': 'UHD',
            'P': 'PLASMA'
        }
    },
    screenType: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenMap: {
            'C': 'CURVED',
            'F': 'FLAT'
        }
    },
    backlightType: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenMap: {
            'A': 'EDGE-LIT LED BACKLIGHT',
            'B': 'FULL ARRAY BACKLIGHT'
        }
    },
    digitalTuner: {
        tokenRange: [1],
        tokenFormat: 'STRING',
        tokenEmptyValue: 'NORTH AMERICA',
        tokenMap: {
            'W': 'DVB-T/C',
            'K': 'DVB-T2/C',
            'B': 'DVB-T2/C/S2',
            'U': '2 x DVB-T2/C/S2',
            'T': '2 x DVB-T2/C/S2'
        }
    },
    screenSize: {
        tokenRange: [2],
        tokenFormat: 'DIGITAL'
    },
    series: {
        tokenRange: [4],
        tokenFormat: 'DIGITAL'
    }
};