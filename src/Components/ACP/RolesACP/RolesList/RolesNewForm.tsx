import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import Store from "../../../App/Store/rootStore";
import { IRoleForm } from "../../../../Models/roleForm";

interface IProps {
  setAddingRole: (addingRole: boolean) => void;
}

const RolesNewForm: React.FC<IProps> = ({ setAddingRole }) => {
  const store = useContext(Store);
  const { addRole, loadRoles } = store.userStore;

    const [submitting, setSubmitting] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    
    setSubmitting(true);

    let roleToAdd: IRoleForm = {
      role_name: values.name,
    };

    addRole(roleToAdd)
    .then(() => {
      setSubmitting(false);
    })
    .then(() => {
      loadRoles();
      setAddingRole(false);
    });
  };

  return (
    <div>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Field
                  name="name"
                  placeholder="Role Name"
                  component={TextInput}
                ></Field>
                <Button loading={submitting} className="mainButton" type="submit" content="Submit" />
                <Button
                  content="Cancel"
                  className="mainButton"
                  onClick={() => {
                    setAddingRole(false);
                  }}
                />
              </Form.Group>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default RolesNewForm;
