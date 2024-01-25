import { app, BrowserWindow } from 'electron';
import path from 'path';
import { is } from '@electron-toolkit/utils';

function createWindow() {
	const HomeWin = new BrowserWindow({
		width: 900,
		height: 700,
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

	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		HomeWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		HomeWin.loadFile(path.join(__dirname, '../renderer/index.html'));
	}
}
app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
