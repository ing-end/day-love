import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { is } from '@electron-toolkit/utils';

var HomeWin = null;
function createWindow() {
	HomeWin = new BrowserWindow({
		height: 900,
		width: 1200,
		show: false,
		frame: false,
		autoHideMenuBar: true,
		icon: path.join(__dirname, '../../resources/icon.png'),
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, '../preload/index.js')
		}
	});

	HomeWin.on('ready-to-show', () => {
		HomeWin.show();
	});

	HomeWin.on('maximize', () => {
		HomeWin.webContents.send('update_size_state', true);
	});

	HomeWin.on('unmaximize', () => {
		HomeWin.webContents.send('update_size_state', false);
	});

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		HomeWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		HomeWin.loadFile(path.join(__dirname, '../renderer/index.html'));
	}
}
app.whenReady().then(() => {
	createWindow();
	ipcMain.on('app_maximize', () => {
		HomeWin.maximize();
	});
	ipcMain.on('app_unmaximize', () => {
		HomeWin.unmaximize();
	});
	ipcMain.on('app_minimize', () => {
		HomeWin.minimize();
	});
	ipcMain.on('app_quit', () => {
		app.quit();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
