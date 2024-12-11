/**
 * @fileoverview Main entry point of the ISearchEngine application.
 * This script initializes the application with a specified database
 * and a canvas element from the DOM, and it provides a global reference
 * to the ISearchEngine instance for debugging purposes.
 */

import { ISearchEngine } from "./ISearchEngine.js";

// Global variable to hold the application instance
let app = null;

/**
 * Main function to initialize the ISearchEngine application.
 * 
 * @function main
 */
function main() {
    // Get the canvas element from the DOM by its ID
    const canvas = document.getElementById("canvas");

    // Create an instance of ISearchEngine with a reference to the database file
    app = new ISearchEngine("database.json");

    /**
     * Exposing the application instance globally for debugging purposes.
     * 
     * WARNING: Avoid exposing sensitive objects or data globally in production
     * environments as it can pose security risks.
     */
    window.app = app;

    // Initialize the ISearchEngine application with the canvas element
    app.init(canvas).then(() => {
        // Log a success message once the initialization process is complete
        console.log("ISearchEngine Database Initialized...");
        // TODO: Add further application logic or UI updates here if required.
    }).catch(error => {
        // Handle potential errors during the initialization process
        console.error("Error initializing ISearchEngine:", error);
    });
}

// Invoke the main function to start the application
main();
