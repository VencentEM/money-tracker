import { useState } from "react";
import './MyTransactions.css'; // Separate CSS file for this component

function MyTransactions() {
    const [name, setName] = useState('');
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');

    function addNewTransaction(ev) {
        ev.preventDefault();
        const url = process.env.REACT_APP_API_URL + '/transaction';
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, description, datetime })
        }).then(response => {
            response.json().then(json => {
                console.log('result', json);
            });
        });
    }

    return (
        <main>
            <h1>$200<span>.00</span></h1>
            <form onSubmit={addNewTransaction}>
                <div className='basic'>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        placeholder={'+200 new phone'}
                    />
                    <input
                        value={datetime}
                        onChange={ev => setDatetime(ev.target.value)}
                        type="datetime-local"
                    />
                </div>
                <div className='description'>
                    <input
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                        placeholder={'Description'}
                    />
                </div>
                <button type="submit">Add new transaction</button>
            </form>
            <div className='transactions'>
                <div className='transaction'>
                    <div className='left'>
                        <div className='name'>Samsung phone</div>
                        <div className='description'>A new phone</div>
                    </div>
                    <div className='right'>
                        <div className='price red'>-$600</div>
                        <div className='datetime'>09-01-25 06:40</div>
                    </div>
                </div>
                <div className='transaction'>
                    <div className='left'>
                        <div className='name'>New laptop</div>
                        <div className='description'>A new computer</div>
                    </div>
                    <div className='right'>
                        <div className='price green'>+$800</div>
                        <div className='datetime'>09-01-25 06:45</div>
                    </div>
                </div>
                <div className='transaction'>
                    <div className='left'>
                        <div className='name'>Guitar</div>
                        <div className='description'>A new hobby</div>
                    </div>
                    <div className='right'>
                        <div className='price red'>-$900</div>
                        <div className='datetime'>09-01-25 06:47</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyTransactions;
