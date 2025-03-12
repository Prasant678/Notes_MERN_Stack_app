import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <h1>ABOUT US</h1>
      <div className="accordion accordion-flush" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button bg-success text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Analyize Your Notes</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body bg-dark text-white">
              <strong>Analyize Your Notes :</strong> Stay organized and boost your productivity with our intuitive notes web application. Effortlessly create, edit, and manage your notes anytime, anywhere. Enjoy features like rich text formatting, categorization, search functionality, and cloud sync for seamless access across devices. Whether for personal use, work, or study, our app helps you capture ideas, track tasks, and keep important information at your fingertips.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Free To Use</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body bg-dark text-white">
              <strong>Free to use :</strong> Our notes web application is completely free to use, allowing you to capture, organize, and access your notes anytime, anywhere without any cost. First you have to Sign Up and Login then use it. Whether you're jotting down ideas, making to-do lists, or storing important information, our app provides a seamless and secure experience at no charge. Start taking notes effortlessly today!
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Browser Compatible</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body bg-dark text-white">
              <strong>Browser Compatibilty :</strong> Our notes web application is designed to work seamlessly across all major web browsers, ensuring a smooth and consistent experience on any device. It is fully compatible with: Google Chrome, Mozilla Firefox, Microsoft Edge (Chromium-based), Opera
              For the best performance, we recommend using an updated version of your preferred browser. While our app is optimized for modern web standards, some older browser versions may experience limited functionality.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
