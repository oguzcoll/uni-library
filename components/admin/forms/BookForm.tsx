'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { bookSchema } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import ColorPicker from '../ColorPicker';
import { createBook } from '@/lib/admin/actions/book';
import { toast } from '@/hooks/use-toast';

interface Props extends Partial<Book> {
  type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 0,
      totalCopies: 0,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Book Created successfully',
      });
      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    required
                    className='book-form_input'
                    placeholder='book title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'author'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    required
                    className='book-form_input'
                    placeholder='Book Author'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'genre'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    required
                    className='book-form_input'
                    placeholder='Book Genre'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'rating'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={1}
                    max={5}
                    required
                    className='book-form_input'
                    placeholder='Book Rating'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'totalCopies'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={0}
                    max={10000}
                    required
                    className='book-form_input'
                    placeholder='Total Copies'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'coverUrl'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Image
                </FormLabel>
                <FormControl>
                  <FileUpload
                    onFileChange={field.onChange}
                    type='image'
                    accept='image/*'
                    placeholder='Upload Book a Cover'
                    folder='books/covers'
                    variant='light'
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'coverColor'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Primary Color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value}
                    onPickerChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'description'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Book Description'
                    {...field}
                    rows={10}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'videoUrl'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Trailer
                </FormLabel>
                <FormControl>
                  <FileUpload
                    onFileChange={field.onChange}
                    type='video'
                    accept='video/*'
                    placeholder='Upload Book Trailer'
                    folder='books/videos'
                    variant='dark'
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'summary'}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel className='text-base font-normal text-dark-500'>
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Book Summary'
                    {...field}
                    rows={5}
                    className='book-form_input'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='book-form_btn text-white'>
            Add Book to Library
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default BookForm;
