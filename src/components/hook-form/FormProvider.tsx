import { ReactNode } from 'react';
// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  preventEnterSubmit?: boolean;
};

export default function FormProvider({ children, onSubmit, methods, preventEnterSubmit }: Props) {
  const checkKeyDown = (e: any) => {
    if (e.key === 'Enter' && preventEnterSubmit){
      e.preventDefault();
    } 
  };

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onKeyDown={(e) => checkKeyDown(e)}>{children}</form>
    </Form>
  );
}
