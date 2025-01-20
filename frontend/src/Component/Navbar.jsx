import { Button } from "@/components/ui/button";
import { useColorMode } from "@/components/ui/color-mode";
import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={"1140px"}
      px={4}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "2xl", sm: "28" }}
          fontWeight={"bolder"}
          textTransform={"uppercase"}
          bgColor={"blackAlpha.800"}
          bgClip={"text"}
        >
          <Link to={"/"}>Productary 🛒</Link>
        </Text>
      </Flex>
      <HStack spacing={2} alignItems={"center"}>
        <Link to={"/create"}>
          <Button
            bgColor={"transparent"}
            _hover={{
              bg: "blue.400",
              color: "white",
              transform: "scale(1.1)",
            }}
          >
            <FaRegPlusSquare fontSize={20} />
          </Button>
        </Link>
        <Button
          onClick={toggleColorMode}
          bgColor={"transparent"}
          _hover={{
            bg: "blue.400",
            color: "white",
            transform: "scale(1.1)",
          }}
        >
          {colorMode == "light" ? <IoMoon /> : <LuSun size={20} />}
        </Button>
      </HStack>
    </Container>
  );
};
