'use client';

import { CustomerField, UsersField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createUser, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {

  const initialState : State = { message: null, errors: {}};
  const[state, formAction] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                </label>
                <div className="relative">
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby='task-error'
                    />
                    </div>
            </div>
            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                </label>
                <div className="relative">
                    <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby='task-error'
                            />
                </div>
            </div>
            {/* Password */}
            <div className="mb-4">
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                </label>
                <div className="relative">
                        <input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="Enter your password"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby='task-error'
                                />
                </div>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">Create Account</Button>
        </div>
    </form>
  );
}
