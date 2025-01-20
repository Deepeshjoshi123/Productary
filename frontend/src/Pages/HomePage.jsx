import ProductCard from "@/Component/ProductCard";
import { useProductStore } from "@/store/product";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("product", products);

  return (
    <Container maxW={"container.xl"}>
      <VStack>
        <Heading
          as={"h1"}
          alignItems={"center"}
          fontWeight={"bolder"}
          fontSize={"3xl"}
          mt={4}
          mb={5}
        >
          Current Products 🚀
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap="40px"
          w={"full"}
        >
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            display={"flex"}
            gap={4}
            fontSize={"xl"}
            alignItems={"center"}
            fontWeight={"bold"}
            color={"gray.400"}
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                _hover={{
                  textDecoration: "underline",
                  color: "white",
                }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
