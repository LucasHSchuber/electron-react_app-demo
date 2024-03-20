const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();


// Construct the absolute path to the SQLite database file
const dbPath = path.join(__dirname, '..', 'data', 'mydb.db');

// Create or open SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    createTables(); // Call the function to create tables
  }
});

// Function to create tables
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully');
    }
  });
}

// Handle IPC event to fetch users
ipcMain.on('get-users', (event) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      event.reply('get-users-response', { error: err.message });
    } else {
      event.reply('get-users-response', rows);
    }
  });
});

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
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
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

  // Handle app quit
  app.on('window-all-closed', () => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Closed the database connection');
      }
    });
    app.quit();
  });
  // // Quit the app when all windows are closed (except on macOS)
  // app.on('window-all-closed', () => {
  //   if (process.platform !== 'darwin') {
  //     app.quit();
  //   }
  // });

  // Create a new window when the app is activated (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}).catch((err) => {
  console.error('Error loading electron-is-dev:', err);
});
