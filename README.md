# Joyride 🎮 ➡️ ⌨️

## Description

A simple Chrome extension that maps button presses from the [Gamepad
API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)
to
[`KeyboardEvent`s](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

At the moment, because this is just solving a personal issue, it maps the
left/right buttons on a Nintendo Swih Joy-Con to the left/right arrow keys. That
means I can use the Joy-Con as a bluetooth clicker to control a presentation. I
think that's pretty neat.

TODO: Add configuration for generic mapping of button presses to arbitrary keys.

## User installation

Head over to the ["Joyride" in the Chrome Web
Store](https://chrome.google.com/webstore/detail/joyride/hejncbodigbbhdfhkapkfdhhjflafdff).
![Joyride screenshot - maps the joy-con to the current
tab](img/joyride-screenshot.png)

## Developer installation

* Enable `Developer Mode` under `chrome://extensions`
* Choose "Load unpacked extension…" and select the directory containing this
  project
* The button should appear in your top bar. Click to run for the current tab
