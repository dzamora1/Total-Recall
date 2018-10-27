import React from "react";
import "./FormBtn.css";


export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-dark form-btn">
    {props.children}
  </button>
);
