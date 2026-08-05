import { BookOpenIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TaskStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'IP',
          'bg-green-500 text-white': status === 'C',
        },
      )}
    >
      {status === 'O' ? (
        <>
          Open
          <BookOpenIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'IP' ? (
        <>
          In Progress
          <ClockIcon className="ml-1 w-4 text-blue-500" />
        </>
      ) : null}
      {status === 'C' ? (
        <>
          Closed
          <CheckIcon className="ml-1 w-4 text-green-500" />
        </>
      ) : null}
    </span>
  );
}
