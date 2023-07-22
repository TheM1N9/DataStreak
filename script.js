// Define passwords for each user
const user1Password = 'password1';
const user2Password = 'password2';

// Initialize the streak count
let streakCount = 0;

// Get the upload status element
const uploadStatusElement = document.getElementById('uploadStatus');

// Get the upload buttons and password inputs
const user1UploadBtn = document.getElementById('user1UploadBtn');
const user1PasswordInput = document.getElementById('user1Password');
const user2UploadBtn = document.getElementById('user2UploadBtn');
const user2PasswordInput = document.getElementById('user2Password');

// Constants for local storage keys
const USER_1_LAST_UPLOAD_KEY = 'user1LastUpload';
const USER_2_LAST_UPLOAD_KEY = 'user2LastUpload';

// Add event listeners to the upload buttons
user1UploadBtn.addEventListener('click', () => handleUserUpload(1));
user2UploadBtn.addEventListener('click', () => handleUserUpload(2));

// Function to handle user uploads
function handleUserUpload(userId) {
  // Get the last uploaded date for the user from local storage
  const lastUploadDate = getLastUploadDate(userId);

  // Check if it's a new day (if the last uploaded date is not today)
  const currentDate = new Date().toDateString();
  if (lastUploadDate === currentDate) {
    // User has already uploaded today, prevent the upload
    alert('You can only upload once per day.');
    return;
  }

  // Get the entered password for the user
  const passwordInput = userId === 1 ? user1PasswordInput : user2PasswordInput;
  const enteredPassword = passwordInput.value;

  // Check if the entered password matches the user's password
  if (userId === 1 && enteredPassword === user1Password) {
    user1Uploaded = true;

    document.getElementById('user1UploadBtn').addEventListener('click',
function(e){
  google.script.run.withSuccessHandler(onSuccess).uploadFiles(this.parentNode)
})
function onSuccess(data){
  document.getElementById('resp').innerHTML = "File Uploaded to the path " +data;
}

  } else if (userId === 2 && enteredPassword === user2Password) {
    user2Uploaded = true;

    document.getElementById('user2UploadBtn').addEventListener('click',
    function(e){
      google.script.run.withSuccessHandler(onSuccess).uploadFiles(this.parentNode)
    })
    function onSuccess(data){
      document.getElementById('resp').innerHTML = "File Uploaded to the path " +data;
    }

  } else {
    alert('Incorrect password. Please enter the correct password to upload.');
    return;
  }

  // Erase the entered password
  passwordInput.value = '';

  // Simulate file upload to the cloud
  uploadFileToCloud(userId);

  // Update the last uploaded date for the user in local storage
  updateLastUploadDate(userId, currentDate);

  // Check if both users have uploaded their files
  if (user1Uploaded && user2Uploaded) {
    // Both users have uploaded their files, increase the streak count
    streakCount++;
    uploadStatusElement.textContent = `Streak Count: ${streakCount}`;

    // Reset the upload flags for the next streak
    user1Uploaded = false;
    user2Uploaded = false;

    
  }
}

// Function to simulate file upload to the cloud
function uploadFileToCloud(userId) {
  // Your code to upload the file to the cloud goes here
  // This is just a simulated function, so it doesn't actually upload files to the cloud
  // Function to upload file to the server
async function uploadFileToCloud(userId) {
  const fileInput = userId === 1 ? document.getElementById('user1FileInput') : document.getElementById('user2FileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // File uploaded successfully
      // You can update your server-side logic to save the file to your Google Drive here
      console.log('File uploaded successfully');
    } else {
      // Handle errors if the upload fails
      console.error('File upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


}

// Function to get the last uploaded date for the user from local storage
function getLastUploadDate(userId) {
  const key = userId === 1 ? USER_1_LAST_UPLOAD_KEY : USER_2_LAST_UPLOAD_KEY;
  return localStorage.getItem(key) || '';
}

// Function to update the last uploaded date for the user in local storage
function updateLastUploadDate(userId, date) {
  const key = userId === 1 ? USER_1_LAST_UPLOAD_KEY : USER_2_LAST_UPLOAD_KEY;
  localStorage.setItem(key, date);
}
