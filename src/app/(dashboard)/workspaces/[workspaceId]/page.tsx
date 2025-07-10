import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react'
import { WorkspaceIdClient } from './client';

export default async function WorkspaceIdPage() {
  const user = await getCurrent();
    if(!user) redirect('/sign-in')
  return <WorkspaceIdClient />
}
