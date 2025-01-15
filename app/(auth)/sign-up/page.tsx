'use client';
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validation';
import React from 'react';

const Page = () => (
  <AuthForm
    type='SIGN-UP'
    schema={signUpSchema}
    defaultValues={{
      fullName: '',
      email: '',
      universityId: 0,
      universityCard: '',
      password: '',
    }}
    onSubmit={() => {}}
  />
);

export default Page;
