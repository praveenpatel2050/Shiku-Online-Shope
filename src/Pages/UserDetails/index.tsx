import React, { useEffect, useMemo, useState } from 'react'
interface User {
  id: number;
  name: string;
  age: number;
}
const UserDetails = () => {
  const [userId, setUserId] = useState<string>("");

  const getMode = () => {
    const path = window.location.href;
    const pathArray = path.split("/");
    if (pathArray[pathArray.length - 2] === "user") {
      const referralId = pathArray[pathArray.length - 1];
      setUserId(referralId);
    }
  };
  useEffect(() => {
    getMode();
  }, [])
  return (

    <div>
      <h6>User Detail of of this id:- {userId}</h6>
      </div>
  )
}

export default UserDetails;