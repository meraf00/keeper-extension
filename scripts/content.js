const NOTES_KEY = 'WEB_NOTES_CHROME_EXTENSION';

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === 'popup') {
    switch (msg.subject) {
      case 'save': {
        let saved = localStorage.getItem(NOTES_KEY) ?? '[]';
        const notes = JSON.parse(saved);
        notes.push(msg.note);
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        response();
        break;
      }

      case 'query': {
        let saved = localStorage.getItem(NOTES_KEY) ?? '[]';
        const notes = JSON.parse(saved);
        response(notes);
        break;
      }

      case 'delete': {
        let saved = localStorage.getItem(NOTES_KEY) ?? '[]';
        const notes = JSON.parse(saved);

        const afterDeletion = notes.filter(
          (note) =>
            note.title != msg.note.title || note.content != msg.note.content
        );

        localStorage.setItem(NOTES_KEY, JSON.stringify(afterDeletion));
        response();
        break;
      }
    }
  }
});
