import React from 'react';


class AddBudget extends React.Component{
    render(){
        return (
            
        <div>
            <p>
                <label for="Date">Date</label>
                <input id="Date" type="date" />
            </p>
            <p>
                <label for="Amount">Amount</label>
                <input id="Amount" type="number" placeholder="Amount" require />
            </p>
            <p>
                <label for="category">Category</label>
                
                <select name="category" id="category">
                    <option value="">--Please choose an option--</option>
                    <option value="Eating Out">Eating Out</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="General">General</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Kids">Kids</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Sports">Sports</option>
                    <option value="Travel">Travel</option>
                </select>
            </p>
            <p>
            <label for="note">Note</label>
            <textarea name="note" id="note" cols="5" rows="5">No Note Entered</textarea>
            </p>
            <p>
            <button type="submit">Submit</button>
            </p>
        </div>
           
        );
    }
}

export default AddBudget;