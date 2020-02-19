import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "./styles.scss";

export default function App({ values, errors, touched, isSubmitting }) {
  return (
    <>
      <h1>Simple Formik Form with Yup Validation</h1>
      <div className="wrapper">
        <Form>
          <div>
            <label>
              <Field type="email" name="email" placeholder="Email" />
              {touched.email && errors.email && (
                <p className="errorText">{errors.email}</p>
              )}
            </label>
          </div>
          <div>
            <label>
              <Field type="password" name="password" placeholder="Password" />
              {touched.password && errors.password && (
                <p className="errorText">{errors.password}</p>
              )}
            </label>
          </div>
          <label>
            receive the newsletter
            <Field
              id="newsletterCheckbox"
              type="checkbox"
              name="newsletter"
              checked={values.newsletter}
            />
          </label>

          <label>
            <div>
              Choose a plan:
              <Field component="select" name="plan">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </Field>
            </div>
          </label>
          <button disabled={isSubmitting}>Submit</button>
        </Form>
      </div>
    </>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("email is not valid")
      .required("email is required"),
    password: Yup.string("Password is too short")
      .min(8)
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "test@test.com") {
        setErrors({ email: "that email is taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
