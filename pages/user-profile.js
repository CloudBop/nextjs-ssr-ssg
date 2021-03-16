import React from "react";

function UserProfilePage(props) {
  return (
    <div>
      <h1>User Account: {props.username}</h1>
    </div>
  );
}

// server side proper. After the build @ deployment. EG Authentication
export async function getServerSideProps(context) {
  // default NODE/Express object / header access EG for cookies
  const { params, req, res } = context;

  return {
    props: {
      username: "Max"
    }
  };
}

export default UserProfilePage;
