import SignInImg from "../../../assets/logo.png";

const ForgotPassword: React.FC = () => {
  return (
    <article className="bg-color2 min-w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="w-96 space-y-5">
        <div className=" flex flex-col justify-center items-center">
          <div className="border-2 rounded-full p-2 border-color5 hover:bg-color5 hover:scale-150 transition-all">
            <img src={SignInImg} alt="logo" className="w-16" />
          </div>
        </div>
        <h1 className="font-3 text-color7 text-2xl text-center">
          Vui lòng liên hệ với đội kỹ thuật để lấy lại mật khẩu
        </h1>
        <div className="flex flex-col justify-center items-center">
          <a
            href="/"
            className="bg-color5 hover:bg-color4 text-color2 font-3 text-xl rounded-xl px-2 py-1"
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </article>
  );
};
export default ForgotPassword;
