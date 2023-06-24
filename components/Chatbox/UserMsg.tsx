import { Flex, Avatar, Text } from "@chakra-ui/react";

interface UserMsgParams {
  text: string;
}

export default function UserMsg({ text }: UserMsgParams) {
  return (
    <Flex w="100%" justifyContent="flex-end">
      <Flex
        my="1"
        p="3"
        minW="3rem"
        maxW="25rem"
        bg="gray.800"
        color="white"
        rounded={"lg"}
        roundedBottomRight={"0"}
      >
        <Text whiteSpace={"pre-line"}>{text}</Text>
      </Flex>
    </Flex>
  );
}
