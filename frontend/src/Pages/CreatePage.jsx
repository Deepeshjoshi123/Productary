import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const CreatePage = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProducts } = useProductStore();

  const HandleAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setnewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container>
      <Toaster />
      <VStack>
        <Heading
          as={"h1"}
          alignItems={"center"}
          fontWeight={"bolder"}
          fontSize={"3xl"}
          mt={4}
        >
          Create New Product
        </Heading>
      </VStack>
      <VStack mt={3}>
        <Box
          bgGradient="to-r"
          gradientFrom=" #1e3a8a"
          gradientMiddle="#2563eb"
          gradientTo="#60a5fa"
          color="white"
          fontSize="xl"
          padding="4"
          rounded="md"
          boxShadow="md"
        >
          <Input
            placeholder="Enter The Name"
            name="Name"
            type="text"
            mt="3"
            bg="white"
            border="2px solid"
            borderColor="blue.300"
            color="gray.800"
            rounded="md"
            shadow="md"
            padding="5"
            _placeholder={{
              color: "gray.500",
              fontStyle: "italic",
            }}
            _hover={{
              borderColor: "blue.400",
            }}
            _focus={{
              bg: "blue.50",
              transform: "scale(1.02)",
            }}
            value={newProduct.name}
            onChange={(e) =>
              setnewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Input
            placeholder="Enter The Price"
            name="Price"
            type="number"
            mt="3"
            bg="white"
            border="2px solid"
            borderColor="blue.300"
            color="gray.800"
            rounded="md"
            shadow="md"
            padding="5"
            _placeholder={{
              color: "gray.500",
              fontStyle: "italic",
            }}
            _hover={{
              borderColor: "blue.400",
            }}
            _focus={{
              bg: "blue.50",
              transform: "scale(1.02)",
            }}
            value={newProduct.price}
            onChange={(e) =>
              setnewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Input
            placeholder="Enter The ImageUrl"
            name="Image"
            type="text"
            mt="3"
            bg="white"
            border="2px solid"
            borderColor="blue.300"
            color="gray.800"
            rounded="md"
            shadow="md"
            padding="5"
            _placeholder={{
              color: "gray.500",
              fontStyle: "italic",
            }}
            _hover={{
              borderColor: "blue.400",
            }}
            _focus={{
              bg: "blue.50",
              transform: "scale(1.02)",
            }}
            value={newProduct.image}
            onChange={(e) =>
              setnewProduct({ ...newProduct, image: e.target.value })
            }
          />

          <Button
            width={"full"}
            mt={3}
            bgGradient="to-r"
            gradientFrom=" #1e3a8a"
            gradientMiddle="#2563eb"
            gradientTo="#60a5fa"
            color="white"
            fontWeight="bold"
            fontSize="lg"
            padding="6"
            rounded="md"
            boxShadow="lg"
            _hover={{
              bgGradient: "to-r",
              gradientFrom: " #2563eb",
              gradientMiddle: "#60a5fa",
              gradientTo: "#93c5fd",
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            _active={{
              transform: "scale(0.98)", // Pressed effect
              boxShadow: "sm",
            }}
            onClick={HandleAddProduct}
          >
            Submit
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
