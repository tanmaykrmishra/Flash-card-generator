import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const CreateFlashcardPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      terms: [{ term: "", definition: "" }], // Start with one term and definition
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      terms: Yup.array().of(
        Yup.object({
          term: Yup.string().required("Term is required"),
          definition: Yup.string().required("Definition is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
      const newFlashcard = {
        id: Date.now(), // Generate a unique ID
        title: values.title,
        description: values.description,
        terms: values.terms,
      };
      localStorage.setItem(
        "flashcards",
        JSON.stringify([...flashcards, newFlashcard])
      );
      navigate("/");
    },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Create New Flashcard</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Main Flashcard Form */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formik.errors.title && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.title}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formik.errors.description && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* Terms Form */}
        {formik.values.terms.map((term, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Term {index + 1}</h2>
              {formik.values.terms.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue(
                      "terms",
                      formik.values.terms.filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-500 hover:underline"
                >
                  Delete Term
                </button>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor={`terms[${index}].term`}
                className="block text-sm font-medium mb-2"
              >
                Term
              </label>
              <input
                id={`terms[${index}].term`}
                type="text"
                name={`terms[${index}].term`}
                onChange={formik.handleChange}
                value={term.term}
                className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.errors.terms?.[index]?.term
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.terms?.[index]?.term && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.terms[index].term}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor={`terms[${index}].definition`}
                className="block text-sm font-medium mb-2"
              >
                Definition
              </label>
              <textarea
                id={`terms[${index}].definition`}
                name={`terms[${index}].definition`}
                onChange={formik.handleChange}
                value={term.definition}
                className={`border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.errors.terms?.[index]?.definition
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.terms?.[index]?.definition && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.terms[index].definition}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={() =>
              formik.setFieldValue("terms", [
                ...formik.values.terms,
                { term: "", definition: "" },
              ])
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Term
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Create Flashcard
        </button>
      </form>
    </div>
  );
};

export default CreateFlashcardPage;
