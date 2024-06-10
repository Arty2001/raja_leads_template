// components/DashboardLayout.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome, IconSettings, IconUser, IconLogout } from "@tabler/icons-react";
import Avatar from '@mui/material/Avatar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const navItemsTop = [
    { icon: <IconHome />, path: "/dashboard" },
  ];

  const navItemsBottom = [
    { icon: <IconUser />, path: "/dashboard/profile" },
    { icon: <IconSettings />, path: "/dashboard/settings" },
    { icon: <IconLogout />, path: "/dashboard/logout" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", boxSizing: 'border-box', padding: "20px 10px" }}>
      <div style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", // Add box shadow to navbar
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Distribute space between the top and bottom sections
        padding: "1rem 0",
      }}>
        <nav
          style={{
            width: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 0 }}>
            <div style={{ marginBottom: '60px' }}>
              <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
            </div>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {navItemsTop.map((item) => (
                <li
                  key={item.path}
                  style={{
                    marginBottom: "1rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link href={item.path}>{item.icon}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end", // Align the bottom icons to the bottom
            }}
          >
            {navItemsBottom.map((item) => (
              <li
                key={item.path}
                style={{
                  marginBottom: "1rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link href={item.path}>{item.icon}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
