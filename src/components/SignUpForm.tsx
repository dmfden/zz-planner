'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
});

type FormValues = z.infer<typeof userSchema>;

export default function SignUpForm(): React.JSX.Element {
    const router = useRouter();

    const validateForm = (values: FormValues) => {
        try {
            userSchema.parse(values);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.formErrors.fieldErrors;
            }
        }
    };

    return (
        <Formik <FormValues>
            initialValues={{
                name: '',
                email: '',
                password: '',
            }}
            validate={validateForm}
            onSubmit={async (values) => {
                // Handle form submission
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'appliction/json'
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password
                    })
                })

                if (response.ok) {
                    console.log(response);
                    router.push('/');
                }

            }}
        >
            <Form>
                <div>
                    <label htmlFor="name">User name</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name" component="div" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
}