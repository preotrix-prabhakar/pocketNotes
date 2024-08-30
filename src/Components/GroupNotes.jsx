import React, { useContext, useEffect, useState } from 'react';
import { GroupData } from '../context/GroupData';
import './GroupNotes.css';
import { MdSend } from 'react-icons/md';
function GroupNotes() {
  const [note, setNote] = useState('');
  const { selectedGroup, setSelectedGroup, addNoteToGroup, groups } = useContext(GroupData);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    if (note.trim()) {
      addNoteToGroup(selectedGroup.groupName, note.trim());
      setNote('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && note.trim()) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const getName = (Name) => {
    const wordArray = Name.trim().split(' ');

    if (wordArray.length === 1) {
      return `${wordArray[0][0]}`;
    } else {
      return `${wordArray[0][0]}${wordArray[wordArray.length - 1][0]}`;
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      const updatedGroup = groups.find(group => group.groupName === selectedGroup.groupName);
      setSelectedGroup(updatedGroup);
    }
  }, [groups, selectedGroup, setSelectedGroup]);

  return (
    <div className="group-notes-container">
      {selectedGroup ? (
        <>
          <div className="group-header" style={{ backgroundColor: selectedGroup.selectedColor }}>
            <div className="group-icon">{getName(selectedGroup.groupName).toUpperCase()}</div>
            <h2 className="group-name">{selectedGroup.groupName}</h2>
          </div>
          <div className="notes-section">
            {selectedGroup.notes && selectedGroup.notes.length > 0 ? (
              selectedGroup.notes.map((note, index) => (
                <div key={index} className="note-container">
                  <p className="note-text">{note.note}</p>
                  <div className="note-timestamp">
                    <span>{new Date(note.timestamp).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>{new Date(note.timestamp).toLocaleString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-notes">No notes available. Add a new note below.</p>
            )}
          </div>
          <div className="note-input-container">
            <textarea
              className="note-input"
              placeholder="Enter your text here..."
              value={note}
              style={{ 
                color: !note.trim() ? 'red' : 'black',
                border: `20px solid ${selectedGroup.selectedColor}`}}
              onChange={handleNoteChange}
              onKeyDown={handleKeyDown}
              />
              
            <button
              onClick={handleAddNote}
              className="add-note-btn"
              disabled={!note.trim()}
              
            >
              <MdSend
              style={{ margin: '10px' }}
              size={30} 
              color={!note.trim() ? '#CCCCCC' : selectedGroup.selectedColor}/>
            </button>
          </div>
        </>
      ) : (
        <p>Select a group to view and add notes.</p>
      )}
    </div>
  );
}

export default GroupNotes;
