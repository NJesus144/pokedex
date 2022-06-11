import React, { useState } from 'react';

interface SearchbarProps {
    onSearch: any;
 
}

export const Searchbar: React.FC<SearchbarProps> = ({onSearch}) => {
    const [search, setSearch] =useState("ditto")
    
    
    const onChangeHandler =(e:React.ChangeEvent<HTMLInputElement>)=> {
        setSearch(e.target.value.toLowerCase())
        if(e.target.value.length === 0){
            onSearch(undefined)          
        }
    }
    const onButtonClickHandler = ( ) => {
                 onSearch(search)      
    }
    return (
        <div className='flex  p-4'>
            <div className='mr-2'>
                <input className='border-0  outline-none shadow md:shadow-lg" p-2 rounded-md ' placeholder='Get them all' onChange={onChangeHandler} />
            </div>         
            <div>
                <button className=' p-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700  text-white font-bold  border-0' onClick={onButtonClickHandler}>Search</button>
            </div>
        </div>
    );
};

export default Searchbar;