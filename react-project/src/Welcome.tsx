import styles from './Welcome.module.css';

function Welcome() {
  return (
    <main className={styles.main_container}>
      <section className={styles.project_description_container}>
        <h2>Welcome</h2>
        <span className={styles.highlighted_text}>About this app</span>
        <p className={styles.project_description}>
          This application is a lightweight version of Postman and GrqphiQL
          combined into one application. It allows you to make requests to
          variety of open APIs. Postman is a rich platform for using APIs. Using
          the postman analogue - RESTfull client - you can send requests from
          the client to the server and get responses from the server. It
          supports the choice of method, URL, headers. GraphiQL is a
          playground/IDE for GraphiQL queries. You can use headers and
          variables, and you can also get API documentation. Information about
          the request is provided via the URL. The application also contains a
          history section that displays the executed requests
        </p>
      </section>

      <section className={styles.about}>
        <div className={styles.about_section_title}>
          <p className={styles.about_title}>
            This project was developed by
            <span>
              an aspiring web developer diving into the world of React
            </span>
          </p>
          <p className={styles.about_description_text}>PAVEL YAKUTOVICH</p>
        </div>
      </section>
    </main>
  );
}
export default Welcome;
