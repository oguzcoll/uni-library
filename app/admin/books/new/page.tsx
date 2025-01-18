import BookForm from '@/components/admin/forms/BookForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <>
      <Button className='back-btn' asChild>
        <Link href='/admin/books' className='text-white'>
          Go back
        </Link>
      </Button>

      <section className='w-full rounded-2xl max-w-2xl bg-white p-7'>
        <BookForm />
      </section>
    </>
  );
};

export default Page;
