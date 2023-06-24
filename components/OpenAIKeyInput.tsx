import { useEffect } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  HStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { SettingsIcon, InfoIcon } from "@chakra-ui/icons";

interface OpenAIKeyInputParams {
  openAIApiKey: string;
  setOpenAIApiKey: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const OPENAI_API_ITEM_KEY = "openai-api-key";

function OpenAIKeyInput({
  openAIApiKey,
  setOpenAIApiKey,
  isOpen,
  onOpen,
  onClose,
}: OpenAIKeyInputParams) {
  useEffect(() => {
    setOpenAIApiKey(localStorage.getItem(OPENAI_API_ITEM_KEY) ?? "");
  }, []);

  return (
    <Flex>
      <Spacer />
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Box>
            <Button>
              <SettingsIcon
                transition="900ms rotate ease-in-out"
                transform={isOpen ? "rotate(33deg)" : "rotate(0deg)"}
              />
            </Button>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          border={"1px"}
          borderColor={"whiteAlpha.600"}
          boxShadow="xl"
          rounded="xl"
          overflowY="auto"
          bg="gray.800"
        >
          <Box px="1rem" py="1rem">
            <HStack>
              <Text>OpenAI API Key:</Text>
              <Tooltip
                label={
                  "The API key is stored locally in your browser, and never sent to our server."
                }
                hasArrow
                placement="top"
              >
                <InfoIcon />
              </Tooltip>
            </HStack>
            <Input
              mt="0.5rem"
              aria-label="open-ai-api-key"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              autoComplete="off"
              value={openAIApiKey}
              onChange={(e) => {
                localStorage.setItem(OPENAI_API_ITEM_KEY, e.target.value);
                setOpenAIApiKey(e.target.value);
              }}
            />
          </Box>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default OpenAIKeyInput;
