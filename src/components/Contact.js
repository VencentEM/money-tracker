import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons
import './Contact.css'; // For custom styling

function Contact() {
    return (
        <main>
            <h1>Contact Us</h1>
            <p>Email: support@mywebsite.com</p>
            <p>Phone: +212 634 56 789</p>
            <p>Follow us on:</p>
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook className="icon facebook" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter className="icon twitter" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="icon instagram" />
                </a>
            </div>
        </main>
    );
}

export default Contact;
