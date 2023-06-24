"use client";

import { Box, Spacer } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Chatbox from "@/components/Chatbox";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Chatbox />
      <Spacer />
      <Footer />
    </Box>
  );
}
