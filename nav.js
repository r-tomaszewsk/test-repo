window.app = window.app || {};
window.app.nav = function(tizen) {
    'use strict'
    /**
     * RETURN_BUTTON - return button key code
     * SELECT_BUTTON - select button key code
     * LEFT_ARROW_BUTTON - select button key code
     * UP_ARROW_BUTTON - select button key code
     * RIGHT_ARROW_BUTTON - select button key code
     * DOWN_ARROW_BUTTON - select button key code
     */
    const RETURN_BUTTON = 10009,
        // SELECT_BUTTON = 13,
        LEFT_ARROW_BUTTON = 37,
        UP_ARROW_BUTTON = 38,
        RIGHT_ARROW_BUTTON = 39,
        DOWN_ARROW_BUTTON = 40;

    let MAX_TAB_INDEX,
        ACTIVE_CSS_CLASS;

    let recursion = function() {
        const limit = 50;
        let currentVal = limit;
        return {
            reset: function() {
                currentVal = limit;
            },
            increase: function() {
                if (currentVal + 1 === limit) {
                    return false;
                } else {
                    currentVal++;
                    return true;
                }
            }
        }
    }();

    /**
     * TV controller key event handler.
     * @private
     * @param {object} e - event object.
     */
    function keyEventHandler(e) {
        switch (e.keyCode) {
            // case RETURN_BUTTON:
            //     tizen && tizen.application.getCurrentApplication().exit();
            //     break;
            // case SELECT_BUTTON:
            //     // log('select ' + e.keyCode);
            //     break;
            case DOWN_ARROW_BUTTON:
            case RIGHT_ARROW_BUTTON:
                goToNextElem(1);
                e.preventDefault();
                break;
            case UP_ARROW_BUTTON:
            case LEFT_ARROW_BUTTON:
                goToNextElem(-1);
                e.preventDefault();
                break;
            default:
                console.warn('unknown keyCode: ' + e.keyCode);
        }
    }
    /**
     * Binds Default Events.
     * @private
     */
    function bindDefaultEvents() {
        // let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        // tizen && keys.forEach(function(key) {
        //     tizen.tvinputdevice.registerKey(key);
        // });
        document.addEventListener('keydown', keyEventHandler);
    }

    function getActiveElement(selector) {
        let elements = document.querySelectorAll(selector || '.' + ACTIVE_CSS_CLASS),
            candidate,
            minTabIndex = Infinity;

        for (let i = 0; i < elements.length; i++) {
            let elem = elements[i],
                currentTabIndex = parseInt(elem.getAttribute('tabindex'), 10);

            if (isNavigable(elem)) {
                if ((!candidate) || (currentTabIndex < minTabIndex)) {
                    candidate = elem;
                    minTabIndex = currentTabIndex;
                }
            }
        }
        return candidate;
    }

    function goToNextElem(shift) {
        let targetTabIndex,
            activeElem = getActiveElement();

        if (!activeElem) {
            if (activeElem = getActiveElement('[tabindex]')) {
                activeElem.classList.add(ACTIVE_CSS_CLASS);
            } else {
                console.warn('no navigation elements found!');
            }
        } else {
            let tabIdx = parseInt(activeElem.getAttribute('tabindex'), 10);
            if (tabIdx + shift < 0) {
                targetTabIndex = MAX_TAB_INDEX - Math.abs(tabIdx + shift + 1);
            } else {
                targetTabIndex = (tabIdx + shift) % (MAX_TAB_INDEX + 1);
            }
            let newActiveElem = getActiveElement('[tabindex="' + targetTabIndex + '"]');
            if (!newActiveElem) {
                if (!recursion.increase()) {
                    return;
                }
                goToNextElem(shift + (1 * (shift < 0 ? -1 : 1)));
                return;
            }
            activeElem.classList.remove(ACTIVE_CSS_CLASS);
            newActiveElem.classList.add(ACTIVE_CSS_CLASS);
            recursion.reset();
        }
    }

    function isNavigable(elem) {
        return (elem && (elem.offsetWidth > 0) && (elem.offsetHeight > 0) && !elem.hasAttribute('disabled'));
    }

    function determinMaxTabIndex() {
        return document.querySelectorAll('[tabindex]').length - 1;
    }

    return {
        init: function(activeCssClass) {
            ACTIVE_CSS_CLASS = activeCssClass || 'active';
            bindDefaultEvents();
            MAX_TAB_INDEX = determinMaxTabIndex();
            goToNextElem();
        }
    };

}(window.tizen);