import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
// import style
import "./ProposalForm.css";
export default function ProposalForm() {
  // const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(inputs);
  //   const test = contract.addProposal({
  //     title: inputs.title,
  //     description: inputs.description,
  //     url: inputs.URL,
  //   });
  // };
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-box">
  //       <label>
  //         Title:
  //         <input
  //           className="gray_back"
  //           placeholder="Title"
  //           type="text"
  //           name="title"
  //           value={inputs.title || ""}
  //           onChange={handleChange}
  //         />
  //       </label>
  //       <label>
  //         Description:
  //         <textarea
  //           className="gray_back"
  //           placeholder="Description"
  //           type="text"
  //           name="description"
  //           value={inputs.description || ""}
  //           onChange={handleChange}
  //         />
  //       </label>
  //       <label>
  //         URL:
  //         <input
  //           className="gray_back"
  //           placeholder="URL"
  //           type="url"
  //           name="URL"
  //           value={inputs.URL || ""}
  //           onChange={handleChange}
  //           required={false}
  //         />
  //       </label>
  //       <label>
  //         Proposal Type:
  //         <select
  //           name="ProposalType"
  //           value={inputs.value}
  //           onChange={handleChange}
  //           required = {true}
  //         >
  //           <option value="">----Please choose an option----</option>
  //           <option value="test1">Transfer proposal</option>
  //           <option value="test2">Poll proposal</option>

  //         </select>
  //       </label>

  //       <input className="subBtn" type="submit" />
  //     </div>
  //   </form>
  // );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      url: "",
      proposalType: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Title:
            <input
              id="title"
              placeholder="Title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>

          <label>
            Description:
            <textarea
              id="description"
              placeholder="Description"
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>

          <label>
            URL:
            <input
              id="url"
              placeholder="URL"
              type="url"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>

          <label>
            Proposal Type:
            <select
              id="proposalType"
              name="proposalType"
              value={formik.values.proposalType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">----Please choose an option----</option>

              <option value="test1">Transfer proposal</option>

              <option value="test2">Poll proposal</option>
            </select>
          </label>

          <input className="subBtn" type="submit" />
        </div>
      </form>
    </div>
  );
}
