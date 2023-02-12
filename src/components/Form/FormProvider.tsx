import { FormProvider as Form } from "react-hook-form";

interface FormProviderProps {
  children: React.ReactNode;
  methods: any;
  onSubmit: () => {};
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  onSubmit,
  methods,
}) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;
