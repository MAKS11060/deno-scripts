#!/usr/bin/env -S deno run -A

const user32 = Deno.dlopen('user32.dll', {
  // https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagew#syntax
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
  return user32.symbols.SendMessageW(
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
