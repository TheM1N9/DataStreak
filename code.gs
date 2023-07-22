function doGet() {
  var html = HtmlService.createHtmlOutputFromFile('Ds');
  return html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function uploadFiles(data)
{
 var file = data.myFile;
 var folder = DriveApp.getFolderById('1ulcZ3TAsEziiUsI49WXc6TnZKeUiLq67');
 var createFile = folder.createFile(file);
 return createFile.getUrl();
}
