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
import { createTask, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers, users }: { customers: CustomerField[], users: UsersField[] }) {

  const initialState : State = { message: null, errors: {}};
  const[state, formAction] = useActionState(createTask, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title Name */}
        <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Title
            </label>
            <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Task Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby='task-error'
                />
        </div>
        {/* Assign User */}
        <div className="mb-4">
          <label htmlFor="userId" className="mb-2 block text-sm font-medium">
            Assign user
          </label>
          <div className="relative">
            <select
              id="userId"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="user-error"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="user-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>

        {/* Task Notes*/}
        <div className="mb-4">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium">
            Task notes
          </label>
          <div className="relative mt-2 rounded-md">
          <textarea
            id = "notes"
            name = "notes"
            rows={6}
            placeholder="Enter notes..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 align-top text-sm"
            />
            </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
