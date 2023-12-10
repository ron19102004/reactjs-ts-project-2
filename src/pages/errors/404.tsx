import { useNavigate } from "react-router-dom";
import "./404.scss";
const Page404: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center font-3 ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2 font-2">Look like you're lost</h3>

                  <p className="font-2">the page you are looking for not avaible!</p>

                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                    className="link_404 font-3"
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page404;
