import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import Store from "../../../App/Store/rootStore";
import { IProduct } from "../../../../Models/product";

interface IProps {
  setAddingProduct: (addingProduct: boolean) => void;
}

const ProductAddForm: React.FC<IProps> = ({ setAddingProduct }) => {
  const store = useContext(Store);
  const { addProduct } = store.productStore;
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);

    let productToAdd: IProduct = {
      product_name: values.name,
    };

    addProduct(productToAdd)
    .then(() => {
      setSubmitting(false);
    })
    .then(() => {
      setAddingProduct(false);
    });
  };

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Field
                name="name"
                placeholder="Product name"
                component={TextInput}
              />
              <Button loading={submitting} className="mainButton" type="submit">
                Submit
              </Button>
              <Button
                className="mainButton"
                onClick={() => setAddingProduct(false)}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    />
  );
};

export default ProductAddForm;
