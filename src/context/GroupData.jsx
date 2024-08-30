import React, { createContext, useEffect, useState } from 'react';

export const GroupData = createContext();

export const AppProvider = ({ children }) => {
   
    // localStorage.clear()
    const [groups, setGroups] = useState(() => {
        return  JSON.parse(localStorage.getItem('groups')) || [];
      
    });

    const [selectedGroup,setSelectedGroup]=useState(null);

    const addNoteToGroup=(groupName,note)=>{
        setGroups(prevGroups=>{
            return prevGroups.map(group=>{
                if (group.groupName === groupName) {
                    const updatedNotes = [...(group.notes||[]), { note, timestamp: new Date().toISOString() }];
                    return { ...group, notes: updatedNotes };
                }
                return group;
            })
        })
    }
    
    useEffect(() => {
        localStorage.setItem('groups', JSON.stringify(groups));
    }, [groups]);

    return (
        <GroupData.Provider value={{ groups, setGroups,selectedGroup,setSelectedGroup,addNoteToGroup }}>
            {children}
        </GroupData.Provider>
    );
};
 