'use strict';

const { app, BrowserWindow, ipcMain, dialog, shell, Menu, nativeTheme } = require('electron');
const path = require('node:path');

const APP_ID = 'com.deepflow.timer';
const BG = '#0a0a0b';

let mainWindow = null;

// Only one DeepFlow window: a second launch focuses the running one.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
}

if (process.platform === 'win32') app.setAppUserModelId(APP_ID);

// Chimes must play even when the window is in the background.
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

nativeTheme.themeSource = 'dark';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 880,
    minWidth: 1024,
    minHeight: 680,
    show: false,
    backgroundColor: BG,
    title: 'DeepFlow',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      // Keep the countdown ticking at full accuracy while minimised / unfocused.
      backgroundThrottling: false,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Links never navigate the app window; external ones open in the browser.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Native replacements for window.alert / window.confirm. Chromium's built-in
// dialogs in Electron can leave text inputs unfocusable afterwards on Windows,
// so the renderer routes them through here instead.
function showDialog(event, kind, message) {
  const win = BrowserWindow.fromWebContents(event.sender) || undefined;
  const isConfirm = kind === 'confirm';
  const result = dialog.showMessageBoxSync(win, {
    type: isConfirm ? 'question' : 'info',
    title: 'DeepFlow',
    message: String(message ?? ''),
    buttons: isConfirm ? ['OK', 'Cancel'] : ['OK'],
    defaultId: 0,
    cancelId: isConfirm ? 1 : 0,
    noLink: true,
  });
  if (win) win.webContents.focus();
  return isConfirm ? result === 0 : undefined;
}

ipcMain.on('dialog:alert', (event, message) => {
  showDialog(event, 'alert', message);
  event.returnValue = true;
});
ipcMain.on('dialog:confirm', (event, message) => {
  event.returnValue = showDialog(event, 'confirm', message);
});

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    { role: 'windowMenu' },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
