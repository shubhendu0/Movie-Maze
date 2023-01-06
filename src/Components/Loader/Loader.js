import React from 'react'
import LoaderCard from './LoaderCard';

const Loader = () => {
    let cards = [];
    for (let i = 0; i < 20; i++) {
        cards.push(<LoaderCard key={i} />);
    }

  return (
    <>
        {cards}
    </>
  )
}

export default Loader