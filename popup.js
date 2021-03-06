const button = document.getElementById('toggle');
button.height = '50px';
button.width = '50px';

console.log('script popup');
button.addEventListener('click', () => {
  // chrome.scripting.executeScript({
  //   file: 'src/whiteboard.js',
  // });
  chrome.runtime.sendMessage(
    { myQuestion: 'Is it ON or OFF?' },
    function (response) {
      console.log('Extension state is: ' + response.state); // should be ON
      if (response.state) {
      }

      // Put the code you want to execute on every tab below:
      // ....
    }
  );
});
