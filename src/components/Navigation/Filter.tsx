import { useState } from "react";
import { Text, Select, Input, Button, Collapse, Flex } from "@chakra-ui/react";
import { FilterValues } from "../../interfaces/FilterValues";

interface FilterProps {
  // onApplyFilters: (filters: FilterValues) => void;
}

const Filter: React.FC<FilterProps> = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log(filters);
  };

  const handleShowNearMe = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      showNearMe: true,
    }));
  };

  return (
    <Flex
      mt={2.5}
      direction="column"
      bg="complementary.300"
      color="primary.600"
    >
      <Button
        variant="solid"
        bg={"accent.100"}
        onClick={() => setIsExpanded(!isExpanded)}
        mb={4}
        p={3}
        _focus={{ outline: "none" }}
        _hover={{
          textDecoration: "underline",
          color: "primary.700",
          transition: "color 0.2s, text-decoration 0.2s",
        }}
      >
        <Text fontSize="lg" transition="color 0.2s">
          Filter
        </Text>
      </Button>
      <Collapse in={isExpanded} animateOpacity>
        <Flex p={4} borderRadius="md" overflowX="auto">
          <Flex flexGrow={1} direction="row">
            <Select
              placeholder="Connector Type"
              name="connectorType"
              onChange={handleChange}
              w={"md"}
            >
              {/* Options for connector type */}
            </Select>
            <Select
              placeholder="Brand"
              name="brand"
              onChange={handleChange}
              ml={1}
            >
              {/* Options for brand */}
            </Select>
            <Input
              type="text"
              name="distance"
              placeholder="Distance"
              onChange={handleChange}
              ml={1}
            />
          </Flex>
          <Button onClick={handleApplyFilters} bg="accent.100" ml={4}>
            Apply
          </Button>
          <Button
            variant="solid"
            onClick={handleShowNearMe}
            bg="accent.100"
            ml={2}
          >
            Show Near Me
          </Button>
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default Filter;
