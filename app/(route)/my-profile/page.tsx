import React from 'react';
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/auth';
import BookList from '@/components/BookList';
// import { sampleBooks } from '@/constants';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { eq } from 'drizzle-orm';

const Page = async () => {
  const session = await auth();

  // fetch borrowed books from drizzle db with join
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id || ''))
    .limit(10)
    .execute();

  const booksList = borrowedBooks.map((record) => record.books);

  return (
    <>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
        className='mb-10'
      >
        <Button>Logout</Button>
      </form>
      <BookList title='Borrowed Books' books={booksList} />
    </>
  );
};
export default Page;
