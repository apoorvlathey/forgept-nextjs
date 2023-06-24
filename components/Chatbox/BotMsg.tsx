import { Flex, Avatar, Text } from "@chakra-ui/react";
import TypingDots from "./TypingDots";

interface BotMsgParams {
  text: string;
  loading?: boolean;
}

export default function BotMsg({ text, loading }: BotMsgParams) {
  return (
    <Flex w="100%" alignItems={"flex-end"}>
      <Avatar name="ForGePT" src="/bot-avatar.png" bg="yellow.300" />
      <Flex
        my="1"
        ml="0.5rem"
        p="3"
        minH="4rem"
        minW="3rem"
        maxW="24rem"
        bg="gray.300"
        color="black"
        rounded={"lg"}
        roundedBottomLeft={"0"}
      >
        {loading ? (
          <TypingDots />
        ) : (
          <Text whiteSpace={"pre-line"} fontWeight={400}>
            {text}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
