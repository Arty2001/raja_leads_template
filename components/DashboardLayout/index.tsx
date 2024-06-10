// components/DashboardLayout.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHome, IconSettings, IconUser } from "@tabler/icons-react"; // Import icons from react-icons

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const navItems = [
    { icon: <IconHome />, path: "/dashboard" },
    { icon: <IconSettings />, path: "/dashboard/settings" },
    { icon: <IconUser />, path: "/dashboard/profile" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", boxSizing: 'border-box', padding: 20 }}>
      <div style={{
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add box shadow to navbar
        borderRadius: 20,
      }}>
        <nav
          style={{
            width: "80px",
            padding: "1rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              width: "100%",
            }}
          >
            {navItems.map((item) => (
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
