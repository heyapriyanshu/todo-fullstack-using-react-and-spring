function FooterComponent() {
  return (
    <footer className="footer mt-auto py-3 bg-light mb-2" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <div className="container d-flex justify-content-center">
        <span className="text-muted">@2024 Connect with me </span>
        <a href="https://www.linkedin.com/in/priyanshuranjan-" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
            width="24"
            height="24"
            className="mx-2"
            style={{ filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" }}
          />
        </a>
        <span className="text-muted">Source code </span>
        <a href="https://github.com/heyapriyanshu/todo-fullstack-using-react-and-spring" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            width="24"
            height="24"
            className="mx-2"
          />
        </a>
      </div>
    </footer>
  );
}

export default FooterComponent;
