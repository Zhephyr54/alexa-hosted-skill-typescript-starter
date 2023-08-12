const { keyboard, Key } = require('@nut-tree/nut-js');

(async () => {
    await keyboard.pressKey(Key.LeftShift, Key.F5);
    await keyboard.releaseKey(Key.LeftShift, Key.F5);
})();
