import LoginForm from "./loginForm";
import RightLogin from "./rightLogin";

export default function C_login() {
  return (
    <div className={`flex justify-center items-center h-screen`}>
      <div className={`overflow-hidden w-[80vw] h-[90vh] flex justify-between items-center bg-[white] rounded-md`}>
        <div className={`w-6/12 h-full`}>
          <LoginForm />
        </div>
        <div className={`w-6/12 h-full overflow-hidden relative`}>
          <img className="h-full w-full object-cover" src="/AdobeStock_286715999_Preview.jpeg" alt="" />
          <RightLogin />          
        </div>
      </div>
    </div>
  );
}
