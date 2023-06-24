import { Flex, Avatar, Text } from "@chakra-ui/react";

interface BotMsgParams {
  text: string;
}

export default function BotMsg({ text }: BotMsgParams) {
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
        <Text whiteSpace={"pre-line"} fontWeight={400}>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
