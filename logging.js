// Save the original console methods
const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error
};

// Custom function to handle logs, warnings, and errors
function customLogHandler(type, message, ...args) {
    // Forward to your custom logging system
    //console.log(`[Custom ${type}]`, message, ...args);
    
    // Example: Send logs to a server (uncomment if needed)
    // fetch('/log', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         type: type,
    //         message: message,
    //         args: args
    //     })
    // });
}

// Override console.log
console.log = function(message, ...args) {
    //customLogHandler('Log', message, ...args);
   //originalConsole.log.apply(console, [message, ...args]);
};

// Override console.warn
console.warn = function(message, ...args) {
    //customLogHandler('Warn', message, ...args);
    //originalConsole.warn.apply(console, [message, ...args]);
};

// Override console.error
console.error = function(message, ...args) {
    //customLogHandler('Error', message, ...args);
    //originalConsole.error.apply(console, [message, ...args]);
};
