import * as React from "react";
import "./ProposalForm.css";
import { useState } from "react";

export default function ProposalForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    const test = contract.addProposal({
      title: inputs.title,
      description: inputs.description,
      url: inputs.URL,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-box">
        <label>
          Title:
          <input
            className="gray_back"
            placeholder="Title"
            type="text"
            name="title"
            value={inputs.title || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            className="gray_back"
            placeholder="Description"
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          URL:
          <input
            className="gray_back"
            placeholder="URL"
            type="url"
            name="URL"
            value={inputs.URL || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Proposal Type:
          <select
            name="ProposalType"
            value={inputs.value}
            onChange={handleChange}
          >
            <option value="default">----Please choose an option----</option>
            <option value="test1">Transfer proposal</option>
            <option value="test2">Poll proposal</option>
            
          </select>
        </label>

        <input className="subBtn" type="submit" />
      </div>
    </form>
  );
}
