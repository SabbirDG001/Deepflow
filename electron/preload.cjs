'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('deepflowDesktop', {
  platform: process.platform,
  alert: (message) => {
    ipcRenderer.sendSync('dialog:alert', String(message ?? ''));
  },
  confirm: (message) => ipcRenderer.sendSync('dialog:confirm', String(message ?? '')) === true,
});
