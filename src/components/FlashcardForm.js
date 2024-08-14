import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const FlashcardForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    terms: Yup.array()
      .of(
        Yup.object({
          term: Yup.string().required("Required"),
          definition: Yup.string().required("Required"),
        })
      )
      .required("At least one term is required"),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        terms: [{ term: "", definition: "" }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="title">Flashcard Title</label>
            <Field
              name="title"
              type="text"
              className="block border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              as="textarea"
              className="block border p-2 w-full"
            />
          </div>
          <FieldArray name="terms">
            {({ push, remove }) => (
              <div>
                {values.terms.map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <label htmlFor={`terms.${index}.term`}>Term</label>
                      <Field
                        name={`terms.${index}.term`}
                        type="text"
                        className="block border p-2 w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor={`terms.${index}.definition`}>
                        Definition
                      </label>
                      <Field
                        name={`terms.${index}.definition`}
                        type="text"
                        className="block border p-2 w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFieldValue(`terms[${index}].term`, "")}
                      className="text-blue-500"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ term: "", definition: "" })}
                  className="mt-2 bg-blue-500 text-white p-2 rounded"
                >
                  Add More Terms
                </button>
              </div>
            )}
          </FieldArray>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Create Flashcard
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FlashcardForm;
