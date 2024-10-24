// // background.js
// let currentQuestion = '';

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'setQuestion') {
//     currentQuestion = request.question;
//     sendResponse({ status: 'success' });
//   }
// });

// chrome.action.onClicked.addListener((tab) => {
//   if (currentQuestion) {
//     navigator.clipboard.writeText(currentQuestion).then(() => {
//       console.log('Question copied to clipboard successfully! Now go to the Socrate');
//     }).catch(err => {
//       console.error('Failed to copy question: ', err);
//     });
//   } else {
//     console.log('No question to copy.');
//   }
// });
// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      // Set default preferences
      chrome.storage.local.set({
        learningMode: 'beginner',
        notificationsEnabled: true,
        lastProblemId: null,
        sessionHistory: []
      });
    }
  });
  
  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setQuestion') {
      // Store the current question data
      chrome.storage.local.set({
        currentQuestion: request.question,
        lastUpdated: new Date().toISOString()
      }, () => {
        sendResponse({ status: 'success' });
      });
      return true; // Will respond asynchronously
    }
    
    if (request.action === 'startSession') {
      // Handle starting a new learning session
      chrome.storage.local.get(['learningMode'], (data) => {
        // Initialize session with selected mode
        sendResponse({ 
          status: 'success',
          mode: data.learningMode 
        });
      });
      return true;
    }
  });
  
  // Handle notification creation
  function createNotification(title, message) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: title,
      message: message
    });
  }