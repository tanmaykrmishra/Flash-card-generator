import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit, FaArrowLeft } from "react-icons/fa"; // Import icons from react-icons

const CreateFlashcardPage = () => {
  const navigate = useNavigate();
  const termRefs = useRef([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      terms: [{ term: "", definition: "" }],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      terms: Yup.array()
        .of(
          Yup.object({
            term: Yup.string().required("Term is required"),
            definition: Yup.string().required("Definition is required"),
          })
        )
        .min(1, "At least one term and definition is required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      // Check if there is at least one term and definition
      const hasValidTerm = values.terms.some(
        (term) => term.term.trim() !== "" && term.definition.trim() !== ""
      );

      if (!hasValidTerm) {
        alert("At least one term and definition is required.");
        return;
      }

      const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
      const newFlashcard = {
        id: Date.now(),
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

  // Check if there is at least one valid term and definition
  const isButtonDisabled = !formik.values.terms.some(
    (term) => term.term.trim() !== "" && term.definition.trim() !== ""
  );

  const handleEditClick = (index) => {
    // Focus on the term input for the specified index
    if (termRefs.current[index]) {
      termRefs.current[index].focus();
    }
  };

  return (
    <div className="relative p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 flex items-center px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition"
      >
        <FaArrowLeft className="h-5 w-5 mr-2" />
        <span>Go Back</span>
      </button>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Create New Flashcard
      </h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Main Flashcard Form */}
        <div className="mb-8">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter the title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.title}
            </div>
          )}
        </div>
        <div className="mb-8">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* Terms Form */}
        {formik.values.terms.map((term, index) => (
          <div
            key={index}
            className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 relative"
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    "terms",
                    formik.values.terms.filter((_, i) => i !== index)
                  )
                }
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => handleEditClick(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor={`terms[${index}].term`}
                className="block text-lg font-medium mb-2"
              >
                Term
              </label>
              <input
                id={`terms[${index}].term`}
                type="text"
                name={`terms[${index}].term`}
                placeholder="Enter the term"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={term.term}
                ref={(el) => (termRefs.current[index] = el)}
                className={`border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.terms?.[index]?.term &&
                  formik.errors.terms?.[index]?.term
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.terms?.[index]?.term &&
                formik.errors.terms?.[index]?.term && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.terms[index].term}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label
                htmlFor={`terms[${index}].definition`}
                className="block text-lg font-medium mb-2"
              >
                Definition
              </label>
              <textarea
                id={`terms[${index}].definition`}
                name={`terms[${index}].definition`}
                placeholder="Enter the definition"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={term.definition}
                className={`border p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formik.touched.terms?.[index]?.definition &&
                  formik.errors.terms?.[index]?.definition
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.terms?.[index]?.definition &&
                formik.errors.terms?.[index]?.definition && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.terms[index].definition}
                  </div>
                )}
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() =>
              formik.setFieldValue("terms", [
                ...formik.values.terms,
                { term: "", definition: "" },
              ])
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Term
          </button>
        </div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`px-8 py-4 rounded-lg font-semibold transition ${
            isButtonDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Create Flashcard
        </button>
      </form>
    </div>
  );
};

export default CreateFlashcardPage;
