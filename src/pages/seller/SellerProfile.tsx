import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

const SellerProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card
        className="shadow-lg rounded-lg"
        style={{
          backdropFilter: "blur(10px)", 
          backgroundColor: "rgba(255, 255, 255, 0.6)", 
        }}
      > 
        <CardContent>
      

          <div className="space-y-6">
            <div className="flex items-center">
              <Typography variant="body1" className="font-semibold w-1/3 text-black">
                Name:
              </Typography>
              <Typography variant="body1" className="w-2/3 text-black">
                {user.name}
              </Typography>
            </div>
            <Divider />

            <div className="flex items-center">
              <Typography variant="body1" className="font-semibold w-1/3 text-black">
                Email:
              </Typography>
              <Typography variant="body1" className="w-2/3 text-black">
                {user.email}
              </Typography>
            </div>
            <Divider />

            <div className="flex items-center">
              <Typography variant="body1" className="font-semibold w-1/3 text-black">
                Shop Name:
              </Typography>
              <Typography variant="body1" className="w-2/3 text-black">
                {user.shopName}
              </Typography>
            </div>
            <Divider />

            <div className="flex items-center">
              <Typography variant="body1" className="font-semibold w-1/3 text-black">
                Address:
              </Typography>
              <Typography variant="body1" className="w-2/3 text-black">
                {user.address}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerProfile;
