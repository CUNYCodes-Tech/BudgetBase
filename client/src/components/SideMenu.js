import React from 'react';

class SideMenu extends React.Component{
    render(){
        return (
            <div>
                <p>
                    <label for="Date"></label>
                    <input id="Date" type="date" />
                    <button type="button">Search</button>
                </p>
                <p>
                    <button type="button">Add Budget</button>
                </p>
                    <button type="button">Reports</button>
                <p>
                    <button type="button">Checking Account</button>
                </p>
                <p>
                    <button type="button">Import/Export</button>
                </p>
            </div>
        );
    }
}

export default SideMenu;


