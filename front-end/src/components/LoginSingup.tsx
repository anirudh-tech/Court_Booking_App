import user from "../assets/icons/user.svg";
export function LoginOrSignup() {
  return (
    <div className="flex gap-1  md:gap-2 items-center h-full cursor-pointer">
      <img src={user} alt="" />
      <div className="h-full flex gap-1  items-center">
        <span>Login</span> <span>/</span> <span>Signup</span>
      </div>
    </div>
  );
}
