// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const FormEditUser = () => {
//   const [name, setName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [confPassword, setConfPassword] = useState("");
//   // const [role, setRole] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const getUserById = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/users/get-users/${id}`
//         );
//         setName(response.data.name);
//         // setEmail(response.data.email);
//         // setRole(response.data.role);
//       } catch (error) {
//         if (error.response) {
//           setMsg(error.response.data.msg);
//         }
//       }
//     };
//     getUserById();
//   }, [id]);

//   const updateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(`http://localhost:5000/users/update-user/${id}`, {
//         name: name,
//         // email: email,
//         // password: password,
//         // confPassword: confPassword,
//         // role: role,
//       });
//       navigate("/users");
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };
//   return (
//     <div>
//       <h1 className="title">Users</h1>
//       <h2 className="subtitle">Update User</h2>
//       <div className="card is-shadowless">
//         <div className="card-content">
//           <div className="content">
//             <form onSubmit={updateUser}>
//               <p className="has-text-centered">{msg}</p>
//               <div className="field">
//                 <label className="label">Name</label>
//                 <div className="control">
//                   <input
//                     type="text"
//                     className="input"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                   />
//                 </div>
//               </div>
//               <div className="field">
//                 <div className="control">
//                   <button type="submit" className="button is-success">
//                     Update
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormEditUser;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ResetUserName = () => {
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetName = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/reset-user-name",
        {
          newName,
        }
      );
      setMessage(response.data.msg);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Reset Your Name</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter your new name"
      />
      <button onClick={handleResetName}>Reset Name</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetUserName;
