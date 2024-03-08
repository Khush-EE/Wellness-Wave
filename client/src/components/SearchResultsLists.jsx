import React from 'react';
import Searchresult from './Searchresult';

const SearchResultsLists = ({ results }) => {
    return (
        <div className=' '>
            {results.map((result, id) => {
                return <Searchresult result={result.title} key={id} />; 
            })}
        </div>
    );
};

export default SearchResultsLists;
