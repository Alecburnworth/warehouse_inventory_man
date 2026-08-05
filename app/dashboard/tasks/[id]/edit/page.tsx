import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { fetchTaskById, fetchCustomers, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [task, users, customers] = await Promise.all([
      fetchTaskById(id),
      fetchUsers(),
      fetchCustomers()
    ]);
    if(!task){
      notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Edit Task',
            href: `/dashboard/tasks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} users = {users} customers={customers} />
    </main>
  );
}