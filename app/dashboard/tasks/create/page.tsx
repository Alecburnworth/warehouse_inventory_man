import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
  const users = await fetchUsers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/tasks' },
          {
            label: 'Create Task',
            href: '/dashboard/tasks/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} users ={users} />
    </main>
  );
}