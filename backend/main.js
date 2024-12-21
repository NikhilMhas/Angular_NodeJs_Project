//Electron Js project

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); // Use spawn to run the backend server

let mainWindow;

// Handle app ready event
app.on('ready', () => {
    // Start the backend server
    const backend = spawn('node', ['app.js'], {
        cwd: path.join(__dirname),
        shell: true,
    });

    backend.stdout.on('data', (data) => {
        console.log(`Backend: ${data}`);
    });

    backend.stderr.on('data', (data) => {
        console.error(`Backend Error: ${data}`);
    });

    backend.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
    });

    // Create the Electron window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Load your frontend
    mainWindow.loadURL('process.env.PORT');

    mainWindow.on('closed', () => {
        mainWindow = null;
        backend.kill(); // Ensure backend is stopped when the app closes
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
