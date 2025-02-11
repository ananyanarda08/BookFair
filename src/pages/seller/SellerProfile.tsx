import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider, Avatar, Button } from "@mui/material";
import Layout from "../../Layout/Layout";

const SellerProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [profilePic, setProfilePic] = useState<string | null>(user.profilePic || "");  // State for the profile picture

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfilePic(objectUrl);

      localStorage.setItem("profilePic", objectUrl);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <Card
          className="shadow-lg rounded-lg"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <CardContent>
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold mb-4 text-[#1c4e23]">
                Your Profile
              </h2>

              <div className="flex items-center mb-4">
                <Avatar
                  alt="Profile Picture"
                  src={profilePic || "/default-avatar.png"}  
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                <div>
                  <Typography variant="h6" className="font-bold text-black">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {user.shopName}
                  </Typography>
                </div>
              </div>

              <Button
                variant="contained"
                component="label"
                sx={{ marginTop: 2 }}
              >
                Change Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </Button>

              <Divider />

              <div className="flex items-center">
                <Typography variant="h6" className="font-semibold w-1/3 text-black">
                  Name:
                </Typography>
                <Typography variant="h6" className="w-2/3 text-black">
                  {user.name}
                </Typography>
              </div>
              <Divider />

              <div className="flex items-center">
                <Typography variant="h6" className="font-semibold w-1/3 text-black">
                  Email:
                </Typography>
                <Typography variant="h6" className="w-2/3 text-black">
                  {user.email}
                </Typography>
              </div>
              <Divider />

              <div className="flex items-center">
                <Typography variant="h6" className="font-semibold w-1/3 text-black">
                  Shop Name:
                </Typography>
                <Typography variant="h6" className="w-2/3 text-black">
                  {user.shopName}
                </Typography>
              </div>
              <Divider />

              <div className="flex items-center">
                <Typography variant="h6" className="font-semibold w-1/3 text-black">
                  Address:
                </Typography>
                <Typography variant="h6" className="w-2/3 text-black">
                  {user.address}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SellerProfile;
