import React from 'react';

const Searchresult = ({ result }) => {
  return (
    <div className='flex flex-col justify-center items-center max-h-52 overflow-hidden overflow-y-scroll '>
      <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
    </div>
  );
}

export default Searchresult;
