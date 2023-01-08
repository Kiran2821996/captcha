import React, { useRef, useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  // Use useRef to get a reference to the canvas element
  const canvasRef = useRef(null);

 // Use useState to track the current solution to the CAPTCHA
 const [captchaSolution, setCaptchaSolution] = useState(Math.random().toString(36).substring(7));
  const handleReload=()=>{
    setCaptchaSolution(Math.random().toString(36).substring(7))
  }

  useEffect(() => {
    // Get the canvas context
    const context = canvasRef.current.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the solution on the canvas
    context.font = "24px sans-serif";
    context.fillText(captchaSolution, 10, 30);

    // Add some noise to the image
    for (let i = 0; i < 50; i++) {
      context.beginPath();
      context.moveTo(
        Math.random() * canvasRef.current.width,
        Math.random() * canvasRef.current.height
      );
      context.lineTo(
        Math.random() * canvasRef.current.width,
        Math.random() * canvasRef.current.height
      );
      context.stroke();
    }
  }, [captchaSolution]);

  // submit the form
  function handleSubmit(event) {
    event.preventDefault();
    // Get the value of the CAPTCHA text field
    const captcha = event.target.captcha.value;
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Check if the user's solution is correct
      if (captcha === captchaSolution) {
        // The CAPTCHA was solved correctly, so we can submit the form
        window.location.reload()
        alert("Form submitted Succesfully");
      } else {
        // The CAPTCHA was not solved correctly, so display an error message
        alert("The CAPTCHA was not solved correctly. Please try again.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </label>
      <br />
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </label>
      <br />
      <label htmlFor="passwordConfirmation">
        Confirm Password:
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        {errors.passwordConfirmation && <p>{errors.passwordConfirmation}</p>}
      </label>
      <br />
      <label htmlFor="captcha">Enter the solution to the CAPTCHA:</label>
      <div>
        <canvas ref={canvasRef} width="200" height="50" />
        <h6 onClick={handleReload} >Reload</h6>
      </div>
      <input type="text" name="captcha" />
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default App;
