"use client";

import { useState } from "react";
import { Box, Spacer } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Chatbox from "@/components/Chatbox";
import Footer from "@/components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("err:", err);
    }
  }
  async function sendQuery() {
    if (!query) return;
    setResult("");
    setLoading(true);
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });
      const json = await result.json();
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }
  return (
    <Box>
      <Navbar />
      <Chatbox />
      <Spacer />
      <Footer />
    </Box>
  );
}
