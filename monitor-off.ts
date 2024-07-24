#!/usr/bin/env -S deno run -A

// Install
// deno install -Arfgn monitor-off --unstable-ffi https://raw.githubusercontent.com/MAKS11060/deno-scripts/main/monitor-off.ts

const user32 = Deno.dlopen('user32.dll', {
  SendMessageW: {
    parameters: ['i32', 'u32', 'u32', 'i32'],
    result: 'i32',
  },
})

const HWND_BROADCAST = 0xffff
const WM_SYSCOMMAND = 0x0112
const SC_MONITORPOWER = 0xf170
const MONITOR_OFF = 2

function setMonitorToSleep() {
  user32.symbols.SendMessageW(
    HWND_BROADCAST,
    WM_SYSCOMMAND,
    SC_MONITORPOWER,
    MONITOR_OFF
  )
}

if (import.meta.main) {
  setMonitorToSleep()
}

user32.close()
