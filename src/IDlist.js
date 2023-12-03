import React from 'react';
import ItemDeleteButton from './ItemDeleteButton';
import { useParams } from 'react-router-dom';

function IDList({ items }) {
    const{it}=useParams();
  return (
    <div>
     <h2>{it}</h2>
    </div>
  );
}

export default IDList;
