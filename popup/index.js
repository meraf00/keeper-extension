const Note = (note) =>
  `<li><a href="detail.html?title=${note.title}&content=${note.content}">${note.title}</a></li>`;

const populateUI = (notes) => {
  const listComponent = document.getElementById('notes-list');

  if (notes.length === 0) {
    listComponent.innerHTML = "You haven't added any note yet!";
    return;
  }

  listComponent.innerHTML = notes.map((note) => Note(note)).join('');
};

window.onload = () => {
  const onResponse = (notes) => populateUI(notes);

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
          subject: 'query',
        },
        onResponse
      );
    }
  );
};
