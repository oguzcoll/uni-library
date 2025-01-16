'use client';
import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/actions/auth';
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
    onSubmit={signUp}
  />
);

export default Page;
