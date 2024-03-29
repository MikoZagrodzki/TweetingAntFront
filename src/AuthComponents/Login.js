import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Incorrect email or password");
    }
    setLoading(false);
  }

  return (
      <div className="login-container">
        <Card id="card">
          <Card.Body>
            <h2 className="text-center mb-4"> Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button
                disabled={loading}
                id="login-button"
                className="mt-4 w-100"
                type="submit"
              >
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 pb-1">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
  );
}
