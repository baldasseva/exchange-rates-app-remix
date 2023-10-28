import React from "react";
import { Link } from "@remix-run/react";
import { AppShell, Button, Group } from "@mantine/core";

const Layout = ({ children, page }) => {
  return (
    <AppShell header={{ height: 100 }} padding="md">
      <AppShell.Header style={{ background: "#EA640D", color: "#FFFFFF" }}>
        <Group h="100%" px="md" justify="space-between">
          <h1 style={{ textTransform: "capitalize" }}>{page}</h1>
          <div>
            <Button variant="subtle" color="rgba(255, 255, 255, 1)">
              <Link to="/rates" style={{ all: "inherit" }}>
                Rates
              </Link>
            </Button>
            <Button variant="subtle" color="rgba(255, 255, 255, 1)">
              <Link to="/exchange" style={{ all: "inherit" }}>
                Exchange
              </Link>
            </Button>
            <Button variant="subtle" color="rgba(255, 255, 255, 1)">
              <Link to="/history" style={{ all: "inherit" }}>
                History
              </Link>
            </Button>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
