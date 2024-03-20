// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const os = require("os");


console.log("Preload script loaded");

contextBridge.exposeInMainWorld('electron', {
    homeDir: () => os.homedir(),
    osVersion: () => os.version(),
    arch: () => os.arch(),
});




let sendSubmit = (lead) => {
    ipcRenderer.send("add-user", lead);
}
let indexBridge = {
    sendSubmit: sendSubmit
}
contextBridge.exposeInMainWorld("Bridge", indexBridge)




contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});