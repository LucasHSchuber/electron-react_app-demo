const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
import('electron-is-dev').then((isDev) => {
  // Initialize mainWindow variable
  let mainWindow;

  // Function to create the main window
  const createWindow = () => {
    // Configure the main window
    mainWindow = new BrowserWindow({
      width: 1000,
      minWidth: 400,
      height: 600,
      minHeight: 550,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
        autoHideMenuBar: true,
      },
    });


    // Create a custom menu template
    const menuTemplate = [
      {
        label: 'MyElectronApp',
        submenu: [
          { role: 'about' }, // macOS: Show About MyApp
          { type: 'separator' },
          { role: 'quit' }, // macOS: Quit MyApp, others: Exit
        ],
      },
      {
        label: 'File',
        submenu: [
          { role: 'close' }, // macOS: Close Window
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'delete' },
          { role: 'selectAll' },
        ],
      },
      // Add more menu items as needed
    ];

    // Create the menu from the template
    const menu = Menu.buildFromTemplate(menuTemplate);

    // Set the application menu
    Menu.setApplicationMenu(menu);

    // Hide the menu bar
    // mainWindow.setMenuBarVisibility(false);

    // Load the appropriate URL based on the environment
    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000' // Development URL
        : `file://${path.join(__dirname, 'index.html')}` // Production URL
    );

    // Open DevTools in development mode
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  };

  // Create the main window when the app is ready
  app.whenReady().then(createWindow);

  // Quit the app when all windows are closed (except on macOS)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // Create a new window when the app is activated (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}).catch((err) => {
  console.error('Error loading electron-is-dev:', err);
});
