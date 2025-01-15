import React from 'react';

const BookList = ({ title }: any) => {
  console.log(title);
  return (
    <section>
      <h2 className='font-bebas-neue text-4xl text-light-400'>Popular books</h2>
    </section>
  );
};

export default BookList;
