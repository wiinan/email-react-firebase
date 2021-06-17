import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';
import { useLocalContext } from '../../context/context';

export default function MenuItem() {
    const [inputValue, setInputValue] = useState('');
    const { setCategory, category, options } = useLocalContext();
    return (
        <div className='autocomplete'>
            <Autocomplete value={category} onChange={(event, newValue) => setCategory(newValue)} inputValue={inputValue} onInputChange={(event, newValue) => setInputValue( newValue )} id='controllable-states-demo' options={options} style={{ width: 300 }} renderInput={(params) => (
                <TextField {...params} label='Categorize' variant='outlined' />
            )} />
        </div>
    )
}