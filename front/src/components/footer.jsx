import "./footer.css" 
export default function FooterComponent(){
return(
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-section about">
        <h1>Inventory App</h1>
        <p>This is a demo inventory management system.</p>
        <div className="socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <div className="footer-section contact-form">
        <h2>Contact Us</h2>
        <p>Phone : 8345612398</p>
        <p>Email : inventoryadmin@gmail.com</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Inventory App. All rights reserved.</p>
    </div>
  </footer>
)
}