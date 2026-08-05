import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { UpdateTask, DeleteTask } from '@/app/ui/tasks/buttons';
import TaskStatus from '@/app/ui/tasks/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchOpenTasks, fetchInProgressTasks, fetchClosedTasks
 } from '@/app/lib/data';

export default async function TasksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const open_tasks = await fetchOpenTasks(query, currentPage);
  const ip_tasks= await fetchInProgressTasks(query, currentPage);
  const closed_tasks = await fetchClosedTasks(query, currentPage);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {open_tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={task.customer_image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.customer_name}'s profile picture`}
                      />
                    </div>
                  </div>
                  <TaskStatus status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <p className="text-xl font-medium">
                      {formatCurrency(task.amount)}
                    </p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={task.id} />
                    <DeleteTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-align:center text-sm font-normal">
              <tr>
                <th colSpan={4} className="px-4 py-5 font-medium sm:pl-6">
                  Open 
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {open_tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={task.customer_image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.customer_name}'s profile picture`}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {ip_tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={task.customer_image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.customer_name}'s profile picture`}
                      />
                    </div>
                  </div>
                  <TaskStatus status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {task.title}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTask id={task.id} />
                    <DeleteTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-align:center text-sm font-normal">
              <tr>
                <th colSpan={4} className="px-4 py-5 font-medium sm:pl-6">
                  In Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ip_tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={task.customer_image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.customer_name}'s profile picture`}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TaskStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {closed_tasks?.map((task) => (
                <div
                  key={task.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={task.customer_image_url}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${task.customer_name}'s profile picture`}
                        />
                      </div>
                    </div>
                    <TaskStatus status={task.status} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {task.title}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-align:center text-sm font-normal">
              <tr>
                <th colSpan={4} className="px-4 py-5 font-medium sm:pl-6 ">
                  Closed
                </th>
              </tr>
            </thead>
              <tbody className="bg-white">
                {closed_tasks?.map((task) => (
                  <tr
                    key={task.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={task.customer_image_url}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${task.customer_name}'s profile picture`}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {task.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <TaskStatus status={task.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateTask id={task.id} />
                        <DeleteTask id={task.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
