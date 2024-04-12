window.onload = () => {
  const titleComponent = document.getElementById('title');
  const contentComponent = document.getElementById('content');
  const deleteBtn = document.getElementById('delete');

  const urlParams = new URLSearchParams(window.location.search);
  titleComponent.innerHTML = urlParams.get('title');
  contentComponent.innerHTML = urlParams.get('content');

  const onDelete = () => window.location.replace('index.html');

  deleteBtn.addEventListener('click', (e) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            from: 'popup',
            subject: 'delete',
            note: {
              title: urlParams.get('title'),
              content: urlParams.get('content'),
            },
          },
          onDelete
        );
      }
    );
  });
};
