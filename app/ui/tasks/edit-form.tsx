'use client';

import { CustomerField, UsersField, InvoiceForm, TaskForm } from '@/app/lib/definitions';
import {
    BookOpenIcon, 
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {updateTask} from '@/app/lib/actions';

export default function EditTaskForm({
  task,
  users,
  customers,
}: {
  task: TaskForm;
  users: UsersField[];
  customers: CustomerField[];
}) {
  const updateTaskWithId = updateTask.bind(null, task.id);

  return (
    <form action={updateTaskWithId}>
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
                defaultValue={task.title}
                />
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={task.customer_id}
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
              defaultValue={task.user_id}
              aria-describedby="user-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {users.map((users) => (
                <option key={users.id} value={users.id}>
                  {users.name}
                </option>
              ))}
              </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Task Notes */}
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
            defaultValue={task.notes}
            />
            </div>
        </div>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the task status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
            <div className="flex items-center">
                <input
                  id="open"
                  name="status"
                  type="radio"
                  value="O"
                  defaultChecked={task.status === 'O'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="open"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Open <BookOpenIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="in_progress"
                  name="status"
                  type="radio"
                  value="IP"
                  defaultChecked={task.status === 'IP'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="in progress"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  In Progress <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="closed"
                  name="status"
                  type="radio"
                  value="C"
                  defaultChecked={task.status === 'C'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="closed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Closed <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
