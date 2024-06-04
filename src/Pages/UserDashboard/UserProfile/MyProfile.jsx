import { useContext } from "react";
import { AuthContext } from "../../../Contex/AuthProvaider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mx-auto mt-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={user.photoURL}
            alt="Shoes"
            className="rounded-full size-72 border-4 border-blue-600"
          />
        </figure>
        <div className="card-body  ">
          <h2 className="card-title hover:text-blue-600 hover:tracking-widest duration-300">{user.displayName}</h2>
          <p className="font-semibold hover:text-blue-600 hover:tracking-widest duration-100">{user.email}</p>
          <p className="text-lg">User</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
