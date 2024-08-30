import React, { useContext } from 'react';
import { GroupData } from '../context/GroupData';
import "./Sidebar.css"

function Sidebar() {
    const { groups,selectedGroup,setSelectedGroup } = useContext(GroupData);
    const handleGroupClick = (group) => {
        
        setSelectedGroup(group);
    };

    const getName=(Name)=>{
        const wordArray=Name.trim().split(' ');
        
        if(wordArray.length===1){
            return `${wordArray[0][0]}`;
        }
        else{
            return `${wordArray[0][0]}${wordArray[wordArray.length-1][0]}`
        }
    }
    
    return (
        <div className='parent'>
            {groups.map((group, index) => (
                <div className='AllGroup' key={index} 
                onClick={() => handleGroupClick(group)}
                >

                <div className='icon'
                style={{backgroundColor:group.selectedColor}}
                >{getName(group.groupName).toUpperCase()}</div>
                <div>
                    <h3>{group.groupName}</h3>
                </div>
                </div>
                
            ))}
        </div>
    );
}

export default Sidebar;
