const { keyboard, Key } = require('@nut-tree/nut-js');

(async () => {
    // Send restart keyboard shortcut first to avoid restarting immediately after first start
    await keyboard.pressKey(Key.LeftControl, Key.LeftShift, Key.F5);
    await keyboard.releaseKey(Key.LeftControl, Key.LeftShift, Key.F5);
    // Starting while already running has no impact
    await keyboard.type(Key.F5);
})();
