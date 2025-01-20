import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing React Icons
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster, Toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isEditing, setIsEditing] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsEditing(false);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "2xl",
        bg: cardHoverBg,
      }}
      bg={bg}
    >
      {/* Image with adjusted size */}
      <Image
        src={product.image}
        alt={product.name}
        w="100%" // Ensures the image fits the card's width
        h="200px" // Set a consistent height for the image
        objectFit="cover" // Ensures the image scales proportionally and fills the space
        transition="transform 0.3s"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Box p={6}>
        {/* Product Name */}
        <Heading as="h3" size="lg" mb={2} color={textColor}>
          {product.name}
        </Heading>

        {/* Product Price */}
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        {/* Edit and Delete Buttons */}
        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            onClick={() => setIsEditing(!isEditing)}
            leftIcon={<FaEdit />}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
            leftIcon={<FaTrashAlt />}
          >
            Delete
          </Button>
        </HStack>

        {/* Edit Form */}
        {isEditing && (
          <VStack
            spacing={4}
            mt={4}
            p={6}
            borderRadius="md"
            boxShadow="md"
            w="full"
            maxW="sm"
            alignItems="stretch"
            overflow="hidden"
          >
            <Heading
              as="h3"
              size="lg"
              mb={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Edit Product
            </Heading>

            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              size="md"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              focusBorderColor={useColorModeValue("blue.400", "blue.300")}
              mb={3}
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              size="md"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              focusBorderColor={useColorModeValue("blue.400", "blue.300")}
              mb={3}
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
              size="md"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              focusBorderColor={useColorModeValue("blue.400", "blue.300")}
              mb={6}
            />

            <HStack spacing={4} justify="space-between">
              <Button
                colorScheme="blue"
                size="md"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                w="48%"
              >
                Update
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsEditing(false)}
                w="48%"
              >
                Cancel
              </Button>
            </HStack>
            <Toaster />
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
