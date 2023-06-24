import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import BotMsg from "./BotMsg";
import UserMsg from "./UserMsg";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function Chatbox() {
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: `Hi, I am ForGePT 👋\n
    Go ahead and ask me any question related to foundry!\n
    I'll seek the answer within my knowledge base. 😄`,
    },
  ]);

  const scrollBoxRef = useRef<HTMLDivElement>(null);

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
          />
          <Button colorScheme={"blue"} onClick={() => handleSendMessage()}>
            Send
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
