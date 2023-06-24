import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Spacer,
} from "@chakra-ui/react";
import BotMsg from "./BotMsg";
import UserMsg from "./UserMsg";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function Chatbox() {
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: `Hi, I am ForGePT 👋\n
    Go ahead and ask me any question related to foundry!\n
    I'll seek the answer within my knowledge base. 😄`,
    },
  ]);
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(false);

  const sendQuery = async (query: string) => {
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
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim().length) {
      return;
    }

    setMessages((old) => [
      ...old,
      {
        from: "user",
        text: inputMsg,
      },
    ]);
    sendQuery(inputMsg);

    setInputMsg("");
  };

  useEffect(() => {
    if (scrollBoxRef && scrollBoxRef.current) {
      const element = scrollBoxRef.current;

      element.scroll({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, scrollBoxRef]);

  useEffect(() => {
    if (result) {
      setMessages((old) => [
        ...old,
        {
          from: "bot",
          text: result,
        },
      ]);
    }
  }, [result]);

  return (
    <Container mt="8" minW="40vw">
      <Flex
        flexDir={"column"}
        h="70vh"
        p="4"
        bg="brand.pale"
        color="brand.black"
        rounded={"lg"}
      >
        <Flex
          flexDir="column"
          p="3"
          w="100%"
          maxH="inherit"
          overflowY="auto"
          ref={scrollBoxRef}
        >
          {messages.map((msg, i) => {
            if (msg.from === "bot") {
              return <BotMsg key={i} text={msg.text} />;
            } else if (msg.from === "user") {
              return <UserMsg key={i} text={msg.text} />;
            }
          })}
          {loading && <BotMsg text="" loading />}
        </Flex>
        <Spacer />
        <HStack mb="2">
          <Input
            border="2px"
            borderColor={"gray.400"}
            _hover={{
              borderColor: "blue.400",
            }}
            value={inputMsg}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            onChange={(e) => setInputMsg(e.target.value)}
            isDisabled={loading}
          />
          <Button colorScheme={"blue"} onClick={() => handleSendMessage()}>
            Send
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
