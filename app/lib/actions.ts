'use server';

import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
// import { CreateTask } from '../ui/tasks/buttons';

const sql = postgres(process.env.PSTGRES_URL!, {ssl: 'require'});

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter your name',
  }),
  email: z.string({
    invalid_type_error: 'Please enter your email',
  }),
  password: z.string({
    invalid_type_error: 'Please enter a password',
  }),
});

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });

  const TaskFormSchema = z.object({
    id: z.string(),
    title: z.string({
      invalid_type_error: 'Please enter a title.',
    }),
    userId: z.string({
      invalid_type_error: 'Please select a user.',
    }),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    notes: z.string({
      invalid_type_error: 'Please enter a note',
    }),
    date: z.string(),
  });

  const UpdateTaskFormSchema = z.object({
    id: z.string(),
    title: z.string({
      invalid_type_error: 'Please enter a title.',
    }),
    userId: z.string({
      invalid_type_error: 'Please select a user.',
    }),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    notes: z.string({
      invalid_type_error: 'Please enter a note',
    }),
    status: z.string({
      invalid_type_error: 'Please enter a status',
    })
  });

const CreateUser = UserFormSchema.omit({ id: true});

const CreateTask = TaskFormSchema.omit({ id: true, date: true });
const UpdateTask = UpdateTaskFormSchema.omit({ id: true});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type State = {
    errors?: {
      userId?: string[];
      customerId?: string[];
      title?: string[];
      notes?: string[];
    };
    message?: string | null;
  };

  export type RegisterState = {
    errors?: {
      email?: string[];
      password?: string[];
      name?: string[];
    };
    message: string;
  };

  export async function createUser(prevState: RegisterState, formData: FormData) {
    // Validate form using Zod
    const validatedTaskFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    });
  
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedTaskFields.success) {
        return {
        errors: validatedTaskFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Account',
        };
    }
  
    // Prepare data for insertion into the database
    const { name, email, password } = validatedTaskFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
    `;

    if (existing.count > 0){
      return {
        message: 'Email already exists.',
      };
    }
  
    // Insert data into the database
    try {
        await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        `;
    } catch (error) {
        console.error(error);
        throw new Error('Database Error: Failed to create account.');
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard');
    redirect('/login');
  }

export async function createTask(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedTaskFields = CreateTask.safeParse({
      customerId: formData.get('customerId'),
      userId: formData.get('userId'),
      title: formData.get('title'),
      notes: formData.get('notes')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedTaskFields.success) {
      return {
      errors: validatedTaskFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
      };
  }

  // Prepare data for insertion into the database
  const { userId, customerId, title, notes } = validatedTaskFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
      await sql`
      INSERT INTO tasks (user_id, customer_id, title, status, notes, creation_date)
      VALUES (${userId}, ${customerId}, ${title}, 'O', ${notes}, CURRENT_DATE)
      `;
  } catch (error) {
      console.error(error);
      throw new Error('Database Error: Failed to create task.');
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}

export async function updateTask(id: string, formData: FormData) {
  const { userId, customerId, title, status, notes } = UpdateTask.parse({
    userId: formData.get('userId'),
    customerId: formData.get('customerId'),
    title: formData.get('title'),
    status: formData.get('status'),
    notes: formData.get('notes'),
  });
 
  try {
  await sql`
    UPDATE tasks
    SET user_id = ${userId}, 
        customer_id = ${customerId}, 
        title = ${title}, 
        status = ${status},
        notes = ${notes}
    WHERE id = ${id}
  `;
  } catch (error) {
      console.error(error);
      throw new Error('Database Error: Failed to update task.');
  }
 
  revalidatePath('/dashboard/tasks');
  redirect('/dashboard/tasks');
}
   
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        console.error(error);
        throw new Error('Database Error: Failed to create invoice.');
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        console.error(error);
        throw new Error('Database Error: Failed to update invoice.');
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }

  export async function deleteTask(id: string) {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/dashboard/tasks');
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }