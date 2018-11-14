/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {

  alert('Now mapping Joy-Con to this tab! 🎮');

  if ('GamepadEvent' in window) {
    window.addEventListener("gamepadconnected", e => { addGamepad(e.gamepad); });
    window.addEventListener("gamepaddisconnected", e => { removeGamepad(e.gamepad); });
  } else {
    setInterval(scanGamepads, 500);
  }

  const activeGamepads = {};
  const heldButtons = {};
  const keyboardEvents = {
    'arrowRight': {
      'code': 'ArrowRight',
      'key': 'ArrowRight',
      'keyCode': 39,
      'which': 39,
      'bubbles': true,
      'cancelable': true,
      'composed': true
    },
    'arrowLeft': {
      'code': 'ArrowLeft',
      'key': 'ArrowLeft',
      'keyCode': 37,
      'which': 37,
      'bubbles': true,
      'cancelable': true,
      'composed': true
    },
    'arrowDown': {
      'code': 'ArrowDown',
      'key': 'ArrowDown',
      'keyCode': 38,
      'which': 38,
      'bubbles': true,
      'cancelable': true,
      'composed': true
    },
    'arrowUp': {
      'code': 'ArrowUp',
      'key': 'ArrowUp',
      'keyCode': 40,
      'which': 40,
      'bubbles': true,
      'cancelable': true,
      'composed': true
    }
  };

  const buttonMap = {
    'Joy-Con (R) (Vendor: 057e Product: 2007)': {
      0: 'arrowRight',
      1: 'arrowUp',
      2: 'arrowDown',
      3: 'arrowLeft'
    },
    'Joy-Con (L) (Vendor: 057e Product: 2006)': {
      0: 'arrowLeft',
      1: 'arrowUp',
      2: 'arrowDown',
      3: 'arrowRight'
    }
  };
  function addGamepad(gamepad) {
    activeGamepads[gamepad.index] = gamepad;
    heldButtons[gamepad.index] = {};
    window.requestAnimationFrame(updateStatus);
  }

  function removegamepad(gamepad) {
    delete activeGamepads[gamepad.index];
    delete heldButtons[gamepad.index];
  }

  function updateStatus() {
    scanGamepads();
    let seenGamepad = false;

    for (let gIdx in activeGamepads) {
      var curGamepad = activeGamepads[gIdx];
      seenGamepad = true;

      for (let bIdx = 0; bIdx < curGamepad.buttons.length; bIdx++) {
        const button = curGamepad.buttons[bIdx];

        if (typeof(button) == 'object') {
          if (button.pressed) {
            if (!heldButtons[gIdx][bIdx]) {
              heldButtons[gIdx][bIdx] = true;
              triggerMappedKey(curGamepad.id, bIdx);
            }
          } else if(heldButtons[gIdx][bIdx]) {
            heldButtons[gIdx][bIdx] = false;
          }
        }
      }
    }

    if (seenGamepad) {
      window.requestAnimationFrame(updateStatus);
    }
  }

  function triggerMappedKey(gamepadId, buttonId) {
    if (buttonMap[gamepadId] && buttonMap[gamepadId][buttonId]) {
      let target = document.activeElement;

      while (target.contentDocument) {
        target = target.contentDocument.activeElement;
      }

      const keyboardEvent = new KeyboardEvent('keydown', keyboardEvents[ buttonMap[gamepadId][buttonId] ]);
      target.dispatchEvent(keyboardEvent);
    }
  }

  function scanGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    for (let gIdx = 0; gIdx < gamepads.length; gIdx++) {
      if (gamepads[gIdx]) {
        if (!(gamepads[gIdx].index in activeGamepads)) {
          addGamepad(gamepads[gIdx]);
        } else {
          activeGamepads[gamepads[gIdx].index] = gamepads[gIdx];
        }
      }
    }
  }

})();
