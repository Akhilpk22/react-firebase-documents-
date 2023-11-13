import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div
        style={{ width: "100%", height: "100vh" }}
        className="d-flex justify-content-center align-items-center "
      >
        <Link to={"/Document"}>
          <h1
            style={{
              width: "500px",
              fontSize: "70px",
              fontFamily: "Dancing Script",
            }}
            className="btn bg-body-secondary"
          >
            Create Docs
          </h1>
        </Link>
      </div>
    </>
  );
}

export default Home;
