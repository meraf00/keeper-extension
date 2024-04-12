const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const onSave = () => {
    window.location.replace('index.html');
  };

  const title = document.getElementById('title');
  const note = document.getElementById('note');

  if (title.value.length === 0 || note.value.length === 0) return;

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
          subject: 'save',
          note: {
            title: title.value,
            content: note.value,
          },
        },
        onSave
      );
    }
  );
});
