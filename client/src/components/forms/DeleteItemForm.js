import React from 'react'

class DeleteItemForm extends React.Component{

    render(){
        return(
            <div>
                <p>Delete this item?</p>
                <div className = "input-field col s6">
                    <button className = "btn">Delete</button>
                </div>
                <div className = "input-field col s6">
                    <button className = "btn" onClick = {() => this.props.toggleModal()}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default DeleteItemForm;