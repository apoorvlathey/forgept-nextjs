import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import BotMsg from "./BotMsg";
import UserMsg from "./UserMsg";
import OpenAIKeyInput from "@/components/OpenAIKeyInput";

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
  const [openAIApiKey, setOpenAIApiKey] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();

  const sendQuery = async (query: string) => {
    if (openAIApiKey.length === 0) {
      setResult("Please set your OpenAI API Key in the settings menu ↗️");
      onOpen();
      return;
    }

    setLoading(true);
    try {
      // Create query embedding
      const queryEmbedding = await new OpenAIEmbeddings({
        openAIApiKey,
      }).embedQuery(query);

      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify({
          question: query,
          queryEmbedding,
        }),
      });
      const json = await result.json();

      // 8. Create an OpenAI instance and load the QAStuffChain
      const llm = new OpenAI({ openAIApiKey });
      const chain = loadQAStuffChain(llm);
      // 9. Execute the chain with input documents and question
      const res = await chain.call({
        input_documents: [new Document({ pageContent: json.data })],
        question: query,
      });

      setResult(res.text);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setResult("☠️ There was some error, please check console");
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
      <OpenAIKeyInput
        openAIApiKey={openAIApiKey}
        setOpenAIApiKey={setOpenAIApiKey}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Flex
        flexDir={"column"}
        mt="0.5rem"
        p="4"
        h="70vh"
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
