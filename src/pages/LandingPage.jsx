import { Link } from "react-router-dom";
export function LandingPage() {
  return (
    <>
      <p>Landing Page</p>
      <p>Get Started !</p>
      <a href="/track">start tracking</a>
      <p>
        <Link to="/track">start tracking</Link>
      </p>
    </>
  );
}
