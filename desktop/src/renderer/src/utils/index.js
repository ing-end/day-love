function sendToMainProcess(name, data = {}) {
	window.electron.ipcRenderer.send(name, data);
}
const onMainProcess = (name, callback) =>
	window.electron.ipcRenderer.on(name, (_event, value) => callback(value));
const utils = {
	sendToMainProcess,
	onMainProcess
};

export default utils;
